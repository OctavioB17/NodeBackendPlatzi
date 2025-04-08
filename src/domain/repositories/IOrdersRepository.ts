import OrdersModel from "../../infraestructure/database/models/OrdersModel";
import OrderHasProducts from "../entities/OrderHasProducts";
import Orders from "../entities/Orders";
import { statusTypes } from "../interfaces/orders/OrdersTypes";

export default interface IOrdersRepository {
  createOrder(order: Orders): Promise<boolean | null>;
  addItemToOrder(orderHasProduct: OrderHasProducts[]): Promise<OrderHasProducts[] | null>;
  findById(id: string): Promise<Orders | null>;
  findByIdInSystem(id: string): Promise<OrdersModel | null>;
  findAllByUserId(userId: string): Promise<Orders[] | null>;
  updateOrder(orderId: string, orderData: Partial<Orders>): Promise<Orders | null>;
  updateStatus(orderId: string, status: statusTypes): Promise<string | null>
  deleteOrder(id: string): Promise<boolean | null>;
}