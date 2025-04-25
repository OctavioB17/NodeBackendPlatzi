  import { inject, injectable } from "inversify";
  import IAddProductsToOrder from "../../../interfaces/orders/post/IAddProductsToOrder";
  import { ORDER_TYPES, PRODUCT_TYPES, UTIL_TYPES } from "../../../../types";
  import IOrdersRepository from "../../../../domain/repositories/IOrdersRepository";
  import { IIdGenerator } from "../../../../infraestructure/services/interfaces/IIdGenerator";
  import IOrdersMapper from "../../../../infraestructure/mappers/interfaces/IOrdersMapper";
  import OrderHasProductsDTO from "../../../../infraestructure/dtos/orders/OrderHasProductsDTO";
  import { BoomError } from "../../../../domain/entities/DomainError";
  import { ErrorType } from "../../../../domain/interfaces/Error";
  import IModifyQuantityInOrder from "../../../interfaces/orders/patch/IModifyQuantityInOrder";
  import IDeleteItemInOrder from "../../../interfaces/orders/delete/IDeleteItemInOrder";
  import OrderHasProducts from "../../../../domain/entities/OrderHasProducts";
  import IFindProductById from "../../../interfaces/products/get/IFindProductById";
  import IUpdateStock from "../../../interfaces/products/patch/IUpdateStock";

  @injectable()
  export default class AddProductsToOrders implements IAddProductsToOrder {
    constructor(
      @inject(ORDER_TYPES.IOrdersRepository) private orderRepository: IOrdersRepository,
      @inject(ORDER_TYPES.IOrdersMapper) private orderMapper: IOrdersMapper,
      @inject(UTIL_TYPES.IIdGenerator) private idGenerator: IIdGenerator,
      @inject(ORDER_TYPES.IModifyQuantityInOrder) private modifyQuantityInOrder: IModifyQuantityInOrder,
      @inject(ORDER_TYPES.IDeleteItemInOrder) private deleteItemInOrder: IDeleteItemInOrder,
      @inject(PRODUCT_TYPES.IUpdateStock) private updateStock: IUpdateStock,
      @inject(PRODUCT_TYPES.IFindProductById) private findProductById: IFindProductById
    ) {}
    async execute(orderHasProductsDto: { orderHasProducts: OrderHasProductsDTO[] }, orderId: string): Promise<OrderHasProductsDTO[] | null> {
      try {
        const order = await this.orderRepository.findById(orderId);
        if (!order) {
          throw new BoomError({
            message: `Error finding order ${orderId}`,
            type: ErrorType.INTERNAL_ERROR,
            statusCode: 500
          });
        }

        const orderProducts = await Promise.all(
          orderHasProductsDto.orderHasProducts.map(orderProduct =>
            this.orderRepository.findProductInOrder(orderId, orderProduct.productId)
          )
        );

        const validOrderProducts = orderProducts.filter((product): product is OrderHasProducts => product !== null);

        if (validOrderProducts.length > 0) {
          const productsToModify: OrderHasProductsDTO[] = [];

          for (const [index, product] of validOrderProducts.entries()) {
            const foundProduct  = await this.findProductById.execute(product.getId());
            if (!foundProduct) {
              throw new BoomError({
                message: `Product not found`,
                type: ErrorType.VALIDATION_ERROR,
                statusCode: 400
              });
            }
            const newQuantity = orderHasProductsDto.orderHasProducts[index].quantity;
            const previousQuantity = product.getQuantity();

            if (newQuantity < 0) {
              throw new BoomError({
                message: `Quantity cannot be less than zero for product ${product.getProductId()}`,
                type: ErrorType.VALIDATION_ERROR,
                statusCode: 400
              });
            }

            if (newQuantity === 0) {
              // ✅ 1️⃣ Si la cantidad es 0, elimina el producto de la orden y devuelve el stock al nivel anterior
              await this.deleteItemInOrder.execute(foundProduct.id);
              await this.updateStock.execute(product.getProductId(), foundProduct.stock + previousQuantity);
              return productsToModify;
            }

            // ✅ 2️⃣ Si se modifica la cantidad, ajusta el stock
            const quantityDifference = newQuantity - previousQuantity;
            const newStock = foundProduct.stock - quantityDifference;

            if (newStock < 0) {
              throw new BoomError({
                message: `Insufficient stock for product ${product.getProductId()}`,
                type: ErrorType.VALIDATION_ERROR,
                statusCode: 400
              });
            }

            await this.updateStock.execute(product.getProductId(), newStock);

            productsToModify.push({
              id: product.getId(),
              productId: product.getProductId(),
              orderId: product.getOrderId(),
              quantity: newQuantity,
              createdAt: product.getCreatedAt(),
              updatedAt: product.getUpdatedAt()
            });
          }

          const modify = await this.modifyQuantityInOrder.execute({ orderHasProducts: productsToModify });
          if (!modify) {
            return null;
          }

          return productsToModify;
        }

        // ✅ 3️⃣ Si el producto es nuevo en la orden, aseguramos que hay suficiente stock antes de agregarlo
        const newOrderHasProduct = await Promise.all(orderHasProductsDto.orderHasProducts.map(async productsOrder => {
          const foundProduct = await this.findProductById.execute(productsOrder.productId);
          if (!foundProduct) {
            throw new BoomError({
              message: `Product not found`,
              type: ErrorType.VALIDATION_ERROR,
              statusCode: 400
            });
          }
          if (foundProduct.stock < productsOrder.quantity) {
            throw new BoomError({
              message: `Insufficient stock for product ${productsOrder.productId}`,
              type: ErrorType.VALIDATION_ERROR,
              statusCode: 400
            });
          }

          await this.updateStock.execute(productsOrder.productId, foundProduct.stock - productsOrder.quantity);

          return {
            id: this.idGenerator.generate(),
            orderId: orderId,
            productId: productsOrder.productId,
            quantity: productsOrder.quantity
          };
        }));

        const dtoToEntity = this.orderMapper.orderHasProductDtoToEntityList(newOrderHasProduct);
        const addItems = await this.orderRepository.addItemToOrder(dtoToEntity);
        if (!addItems) {
          return null;
        }

        return this.orderMapper.orderHasProductEntityToDtoList(addItems);
      } catch (error) {
        if (error instanceof BoomError) {
          throw error;
        }

        throw new BoomError({
          message: `Error adding products to order`,
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }
    }
  }
