import { inject, injectable } from "inversify";
import Orders from "../../../../domain/entities/Orders";
import IUpdateOrder from "../../../interfaces/orders/patch/IUpdateOrder";
import IOrdersRepository from "../../../../domain/repositories/IOrdersRepository";
import { ORDER_TYPES } from "../../../../types";
import IOrdersMapper from "../../../../infraestructure/mappers/interfaces/IOrdersMapper";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import OrderDTO from "../../../../infraestructure/dtos/orders/OrderDTO";

@injectable()
export default class UpdateOrder implements IUpdateOrder {

  constructor(
      @inject(ORDER_TYPES.IOrdersRepository) private orderRepository: IOrdersRepository,
      @inject(ORDER_TYPES.IOrdersMapper) private orderMapper: IOrdersMapper
  ) {}

  execute(orderId: string, orderData: Partial<OrderDTO>): Promise<Orders | null> {
    try {
      const partialDtoToOrder = this.orderMapper.partialDtoToOrder(orderData)
      const update = this.orderRepository.updateOrder(orderId, partialDtoToOrder)
      if (!update) {
        throw new BoomError({
          message: `Problem to update or to find order ${orderId}`,
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }

      return update
    } catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }

      throw new BoomError({
        message: `Error finding orders`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}