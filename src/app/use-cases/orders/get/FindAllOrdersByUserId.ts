import { inject, injectable } from 'inversify';
import IFindAllOrdersByUserId from '../../../interfaces/orders/get/IFindAllOrdersByUserId';
import IOrdersRepository from '../../../../domain/repositories/IOrdersRepository';
import { ORDER_TYPES } from '../../../../types';
import { BoomError } from '../../../../domain/entities/DomainError';
import { ErrorType } from '../../../../domain/interfaces/Error';
import { OrderWithUserAndProducts } from '../../../../domain/interfaces/orders/IOrders';

@injectable()
export default class FindAllOrdersByUserId implements IFindAllOrdersByUserId {

  constructor(
    @inject(ORDER_TYPES.IOrdersRepository) private orderRepository: IOrdersRepository,
  ) {}

  async execute(userId: string): Promise<OrderWithUserAndProducts[] | null> {
    try {
      const ordersByUser = this.orderRepository.findAllByUserId(userId);
      if (!ordersByUser) {
        throw new BoomError({
          message: `Orders not found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 400
        });
      }

      return ordersByUser
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