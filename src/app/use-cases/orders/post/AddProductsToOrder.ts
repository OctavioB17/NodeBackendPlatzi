import { inject, injectable } from "inversify";
import IAddProductsToOrder from "../../../interfaces/orders/post/IAddProductsToOrder";
import { ORDER_TYPES, UTIL_TYPES } from "../../../../types";
import IOrdersRepository from "../../../../domain/repositories/IOrdersRepository";
import { IIdGenerator } from "../../../../domain/services/utils/IIdGenerator";
import IOrdersMapper from "../../../../infraestructure/mappers/interfaces/IOrdersMapper";
import OrderHasProductsDTO from "../../../../infraestructure/dtos/orders/OrderHasProductsDTO";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IModifyQuantityInOrder from "../../../interfaces/orders/patch/IModifyQuantityInOrder";
import IDeleteItemInOrder from "../../../interfaces/orders/delete/IDeleteItemInOrder";
import OrderHasProducts from "../../../../domain/entities/OrderHasProducts";

@injectable()
export default class AddProductsToOrders implements IAddProductsToOrder {
  constructor(
    @inject(ORDER_TYPES.IOrdersRepository) private orderRepository: IOrdersRepository,
    @inject(ORDER_TYPES.IOrdersMapper) private orderMapper: IOrdersMapper,
    @inject(UTIL_TYPES.IIdGenerator) private idGenerator: IIdGenerator,
    @inject(ORDER_TYPES.IModifyQuantityInOrder) private modifyQuantityInOrder: IModifyQuantityInOrder,
    @inject(ORDER_TYPES.IDeleteItemInOrder) private deleteItemInOrder: IDeleteItemInOrder
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
          const newQuantity = orderHasProductsDto.orderHasProducts[index].quantity;

          if (newQuantity < 0) {
            throw new BoomError({
              message: `Quantity cannot be less than zero for product ${product.getProductId()}`,
              type: ErrorType.VALIDATION_ERROR,
              statusCode: 400
            });
          }

          if (newQuantity === 0) {
            await this.deleteItemInOrder.execute(product.getId());
            return productsToModify;
          }

          productsToModify.push({
            id: product.getId(),
            productId: product.getProductId(),
            orderId: product.getOrderId(),
            quantity: newQuantity,
            createdAt: product.getCreatedAt(),
            updatedAt: product.getUpdatedAt()
          });
        }
        const modify = await this.modifyQuantityInOrder.execute({ orderHasProducts: productsToModify});
        if (!modify) {
          return null;
        }

        return productsToModify;
      }

      const newOrderHasProduct = orderHasProductsDto.orderHasProducts.map(productsOrder => ({
        id: this.idGenerator.generate(),
        orderId: orderId,
        productId: productsOrder.productId,
        quantity: productsOrder.quantity
      }));

      const dtoToEntity = this.orderMapper.orderHasProductDtoToEntityList(newOrderHasProduct);
      const addItems = await this.orderRepository.addItemToOrder(dtoToEntity);
      if (!addItems) {
        return null;
      }
      const entityToDto = this.orderMapper.orderHasProductEntityToDtoList(addItems);
      return entityToDto;
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