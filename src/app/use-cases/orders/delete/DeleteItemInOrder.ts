import { inject, injectable } from "inversify";
import IOrdersRepository from "../../../../domain/repositories/IOrdersRepository";
import OrderHasProductsDTO from "../../../../infraestructure/dtos/orders/OrderHasProductsDTO";
import IOrdersMapper from "../../../../infraestructure/mappers/interfaces/IOrdersMapper";
import { ORDER_TYPES } from "../../../../types";
import IDeleteItemInOrder from "../../../interfaces/orders/delete/IDeleteItemInOrder";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";

@injectable()
export default class DeleteItemInOrder implements IDeleteItemInOrder {
  constructor(
    @inject(ORDER_TYPES.IOrdersRepository) private orderRepository: IOrdersRepository,
    @inject(ORDER_TYPES.IOrdersMapper) private ordersMapper: IOrdersMapper
  ) {}

  async execute(orderHasProductId: string): Promise<Boolean | null> {
    try {
      const quantityModify = await this.orderRepository.deleteItemToOrder(orderHasProductId)
      if (!quantityModify) {
        throw new BoomError({
          message: `Error to delete item`,
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }

      return true
    } catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }

      throw new BoomError({
        message: `Error deletin item order`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}
