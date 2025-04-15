import { inject, injectable } from "inversify";
import OrderHasProductsDTO from "../../../../infraestructure/dtos/orders/OrderHasProductsDTO";
import IModifyQuantityInOrder from "../../../interfaces/orders/patch/IModifyQuantityInOrder";
import { ORDER_TYPES } from "../../../../types";
import IOrdersRepository from "../../../../domain/repositories/IOrdersRepository";
import IOrdersMapper from "../../../../infraestructure/mappers/interfaces/IOrdersMapper";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";

@injectable()
export default class ModifyQuantityInOrder implements IModifyQuantityInOrder{
  constructor(
    @inject(ORDER_TYPES.IOrdersRepository) private orderRepository: IOrdersRepository,
    @inject(ORDER_TYPES.IOrdersMapper) private ordersMapper: IOrdersMapper
  ) {}
  async execute(order: { orderHasProducts: OrderHasProductsDTO[]; }): Promise<OrderHasProductsDTO[] | null> {
    try {
      const dtoToOrder = this.ordersMapper.orderHasProductDtoToEntityList(order.orderHasProducts)
      const quantityModify = await this.orderRepository.modifyQuantityItemsInAnOrder(dtoToOrder)
      if (!quantityModify) {
        throw new BoomError({
          message: `Error to modify order`,
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }

      return order.orderHasProducts
    } catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }

      throw new BoomError({
        message: `Error to modify order`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}