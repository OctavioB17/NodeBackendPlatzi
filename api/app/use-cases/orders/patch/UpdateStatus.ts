import { injectable, inject } from "inversify";
import IOrdersRepository from "../../../../domain/repositories/IOrdersRepository";
import { ORDER_TYPES } from "../../../../types";
import IUpdateStatus from "../../../interfaces/orders/patch/IUpdateStatus";
import { statusTypes } from "../../../../domain/interfaces/orders/OrdersTypes";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";

@injectable()
export default class UpdateStatus implements IUpdateStatus {

  constructor(
    @inject(ORDER_TYPES.IOrdersRepository) private orderRepository: IOrdersRepository,
  ) {}

  async execute(orderId: string, status: statusTypes): Promise<string | null> {
    try {
        const update = await this.orderRepository.updateStatus(orderId, status)

        if (!update) {
          throw new BoomError({
            message: `Error to update or to find order ${orderId}`,
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