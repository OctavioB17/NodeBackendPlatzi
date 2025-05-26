import { inject, injectable } from "inversify";
import IFindAllOrders from "../../../interfaces/orders/get/IFindAllOrders";
import { ORDER_TYPES } from "../../../../types";
import IOrdersRepository from "../../../../domain/repositories/IOrdersRepository";
import { IPagination } from "../../../../domain/interfaces/IPagination";
import { OrderWithUserAndProducts } from "../../../../domain/interfaces/orders/IOrders";

@injectable()
export default class FindAllOrders implements IFindAllOrders {
  private ordersRepository: IOrdersRepository;

  constructor(
    @inject(ORDER_TYPES.IOrdersRepository) ordersRepository: IOrdersRepository
  ) {
    this.ordersRepository = ordersRepository;
  }

  async execute(limit: number = 10, offset: number = 0): Promise<IPagination<OrderWithUserAndProducts[]> | null> {
    try {
      const orders = await this.ordersRepository.findAll(limit, offset);
      if (!orders) return null;

      return {
        data: orders,
        limit,
        offset
      };
    } catch (error) {
      throw error;
    }
  }
}