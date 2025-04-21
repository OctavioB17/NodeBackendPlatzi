import { CreateOrderRequest } from "../../../../domain/interfaces/orders/IOrders";

export default interface ICreateOrder {
  execute(orderData: CreateOrderRequest, userId: string): Promise<boolean | null>
}