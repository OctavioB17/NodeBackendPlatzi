import { inject, injectable } from "inversify";
import IAddProductsToOrder from "../../../interfaces/orders/post/IAddProductsToOrder";
import { ORDER_TYPES, UTIL_TYPES } from "../../../../types";
import IOrdersRepository from "../../../../domain/repositories/IOrdersRepository";
import { IIdGenerator } from "../../../../domain/services/utils/IIdGenerator";
import IOrdersMapper from "../../../../infraestructure/mappers/interfaces/IOrdersMapper";
import OrderHasProductsDTO from "../../../../infraestructure/dtos/OrderHasProductsDTO";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";

@injectable()
export default class AddProductsToOrders implements IAddProductsToOrder {
  constructor(
    @inject(ORDER_TYPES.IOrdersRepository) private orderRepository: IOrdersRepository,
    @inject(ORDER_TYPES.IOrdersMapper) private orderMapper: IOrdersMapper,
    @inject(UTIL_TYPES.IIdGenerator) private idGenerator: IIdGenerator,
  ) {}
  async execute(orderHasProductsDto: OrderHasProductsDTO | OrderHasProductsDTO[]): Promise<OrderHasProductsDTO[] | null> {
    try {
      if (!Array.isArray(orderHasProductsDto)) {
        orderHasProductsDto = [orderHasProductsDto]
      }
      const order = await this.orderRepository.findById(orderHasProductsDto[0].id)
      if (!order) {
        throw new BoomError({
          message: `Error finding order ${orderHasProductsDto[0].id}`,
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }
      const dtoToEntity = this.orderMapper.orderHasProductDtoToEntityList(orderHasProductsDto)
      const addItems = await this.orderRepository.addItemToOrder(dtoToEntity)
      if (!addItems) {
        return null
      }
      const entityToDto = this.orderMapper.orderHasProductEntityToDtoList(addItems)
      return entityToDto
    } catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }

      throw new BoomError({
        message: `Error creating order`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}