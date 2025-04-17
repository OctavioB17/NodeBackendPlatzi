import { inject, injectable } from 'inversify';
import IFindAllOrdersByUserId from '../../../interfaces/orders/get/IFindAllOrdersByUserId';
import IOrdersRepository from '../../../../domain/repositories/IOrdersRepository';
import { ORDER_TYPES } from '../../../../types';
import { BoomError } from '../../../../domain/entities/DomainError';
import { ErrorType } from '../../../../domain/interfaces/Error';
import { OrderWithUserAndProducts } from '../../../../domain/interfaces/orders/IOrders';
import { IPagination } from '../../../../domain/interfaces/IPagination';
import PaginationMapper from '../../../../infraestructure/mappers/PaginationMapper';
import { validatePaginationParams } from '../../../../infraestructure/services/utils/ValidatePaginationParams';

@injectable()
export default class FindAllOrdersByUserId implements IFindAllOrdersByUserId {

  constructor(
    @inject(ORDER_TYPES.IOrdersRepository) private orderRepository: IOrdersRepository,
  ) {}

  async execute(userId: string, limit: number, offset: number): Promise<IPagination<OrderWithUserAndProducts[]> | null> {
    try {
      const { limit: validatedLimit, offset: validatedOffset } = validatePaginationParams(limit, offset);

      const ordersByUser = await this.orderRepository.findAllByUserId(userId, validatedLimit, validatedOffset);
      if (!ordersByUser) {
        throw new BoomError({
          message: `Orders not found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 400
        });
      }

      const dataWPagination = PaginationMapper.paginationResponseMapper(ordersByUser, validatedLimit, validatedOffset)
      return dataWPagination
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
