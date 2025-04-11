import { inject, injectable } from "inversify";
import IFindOrderById from "../../../interfaces/orders/get/IFindOrderById";
import { ORDER_TYPES } from "../../../../types";
import IOrdersRepository from "../../../../domain/repositories/IOrdersRepository";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import { OrderWithUserAndProducts } from "../../../../domain/interfaces/orders/IOrders";

@injectable()
export default class FindOrderById implements IFindOrderById {
  constructor(
    @inject(ORDER_TYPES.IOrdersRepository) private orderRepository: IOrdersRepository,
  ) {}

  async execute(id: string): Promise<OrderWithUserAndProducts> {
    try {
      const order = await this.orderRepository.findById(id)
      if (!order) {
        throw new BoomError({
          message: `Orders not found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 400
        });
      }

      return order
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