import { inject, injectable } from "inversify";
import ICreateOrder from "../../../interfaces/orders/post/ICreateOrder";
import { ORDER_TYPES, UTIL_TYPES } from "../../../../types";
import IOrdersMapper from "../../../../infraestructure/mappers/interfaces/IOrdersMapper";
import IOrdersRepository from "../../../../domain/repositories/IOrdersRepository";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
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
      const orderId = this.idGenerator.generate()
      const newOrder = {
        ...orderData.order,
        id: orderId
      }
      console.log(orderData.orderHasProducts)
      const dtoToOrder = this.orderMapper.dtoToOrder(newOrder)
      const create = await this.orderRepository.createOrder(dtoToOrder)
      if (create) {
        const addItems = await this.addProductsToOrder.execute(orderData.orderHasProducts, orderId)
        if (addItems) {
          return true
        }
        else {
          return false
        }
      }
      if (!create) {
        return false
      } else {
        return create
      }
    /*} catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }

      throw new BoomError({
        message: `Error creating order`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }*/
  }
}