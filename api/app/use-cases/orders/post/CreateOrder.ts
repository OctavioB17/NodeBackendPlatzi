import { inject, injectable } from "inversify";
import ICreateOrder from "../../../interfaces/orders/post/ICreateOrder";
import { ORDER_TYPES, UTIL_TYPES } from "../../../../types";
import IOrdersMapper from "../../../../infraestructure/mappers/interfaces/IOrdersMapper";
import IOrdersRepository from "../../../../domain/repositories/IOrdersRepository";
import { IIdGenerator } from "../../../../domain/services/utils/IIdGenerator";
import IAddProductsToOrder from "../../../interfaces/orders/post/IAddProductsToOrder";
import { CreateOrderRequest } from "../../../../domain/interfaces/orders/IOrders";


@injectable()
export default class CreateOrder implements ICreateOrder {

  constructor(
    @inject(ORDER_TYPES.IOrdersRepository) private orderRepository: IOrdersRepository,
    @inject(ORDER_TYPES.IOrdersMapper) private orderMapper: IOrdersMapper,
    @inject(ORDER_TYPES.IAddProductsToOrders) private addProductsToOrder: IAddProductsToOrder,
    @inject(UTIL_TYPES.IIdGenerator) private idGenerator: IIdGenerator,
  ) {}


  async execute(orderData: CreateOrderRequest): Promise<boolean | null> {
    /*try {*/
      const orderId = this.idGenerator.generate();
      const newOrder = {
        ...orderData.order,
        id: orderId
      };

      const dtoToOrder = this.orderMapper.dtoToOrder(newOrder)

      const create = await this.orderRepository.createOrder(dtoToOrder)
      if (create) {
        const orderProducts = orderData.orderHasProducts.map(orderProduct => {
          return {
            id: this.idGenerator.generate(),
            orderId: create.getId(),
            productId: orderProduct.productId,
            quantity: orderProduct.quantity
          }
        });
        const addItems = await this.addProductsToOrder.execute({ orderHasProducts: orderProducts }, orderId);
        return addItems !== null;
      }

      return false;
      }
     /*catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }

      throw new BoomError({
        message: `Error creating order`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }*/
}