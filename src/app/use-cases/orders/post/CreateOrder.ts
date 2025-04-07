import { inject, injectable } from "inversify";
import ProductDTO from "../../../../infraestructure/dtos/OrderDTO";
import ICreateOrder from "../../../interfaces/orders/post/ICreateOrder";
import { ORDER_TYPES, UTIL_TYPES } from "../../../../types";
import { ICategoriesRepository } from "../../../../domain/repositories/ICategoryRepository";
import IOrdersMapper from "../../../../infraestructure/mappers/interfaces/IOrdersMapper";
import OrderDTO from "../../../../infraestructure/dtos/OrderDTO";
import IOrdersRepository from "../../../../domain/repositories/IOrdersRepository";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import { IIdGenerator } from "../../../../domain/services/utils/IIdGenerator";

@injectable()
export default class CreateOrder implements ICreateOrder {

  constructor(
    @inject(ORDER_TYPES.IOrdersRepository) private orderRepository: IOrdersRepository,
    @inject(ORDER_TYPES.IOrdersMapper) private orderMapper: IOrdersMapper,
    @inject(UTIL_TYPES.IIdGenerator) private idGenerator: IIdGenerator,
  ) {}


  async execute(orderDTO: OrderDTO): Promise<boolean | null> {
    try {
      const newOrder = {
        ...orderDTO,
        id: this.idGenerator.generate()
      }
      const dtoToOrder = this.orderMapper.dtoToOrder(newOrder)
      const create = this.orderRepository.createOrder(dtoToOrder)
      if (!create) {
        return false
      } else {
        return create
      }
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