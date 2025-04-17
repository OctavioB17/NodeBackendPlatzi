import { inject } from "inversify";
import IOrdersRepository from "../../../../domain/repositories/IOrdersRepository";
import { ORDER_TYPES } from "../../../../types";
import IDeleteOrder from "../../../interfaces/orders/delete/IDeleteOrder";
import { ErrorType } from "../../../../domain/interfaces/Error";
import { BoomError } from "../../../../domain/entities/DomainError";

export default class DeleteOrders implements IDeleteOrder {

  constructor(
    @inject(ORDER_TYPES.IOrdersRepository) private orderRepository: IOrdersRepository,
  ) {}

  async execute(id: string): Promise<boolean | null> {
    try {
      const deleteOrder = await this.orderRepository.deleteOrder(id)
      if (!deleteOrder) {
        throw new BoomError({
          message: `Error to delete or to find order ${id}`,
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }
      return deleteOrder
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
