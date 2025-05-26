import OrdersModel from "../../infraestructure/database/models/OrdersModel";
import OrderHasProducts from "../entities/OrderHasProducts";
import Orders from "../entities/Orders";
import { OrderWithUserAndProducts } from "../interfaces/orders/IOrders";
import { statusTypes } from "../interfaces/orders/OrdersTypes";

export default interface IOrdersRepository {
  createOrder(order: Orders): Promise<Orders | null>;
  addItemToOrder(orderHasProduct: OrderHasProducts[]): Promise<OrderHasProducts[] | null>;
  deleteItemToOrder(orderHasProductId: string): Promise<Boolean | null>
  modifyQuantityItemsInAnOrder(order: OrderHasProducts[]): Promise<OrderHasProducts[] | null>
  findById(id: string): Promise<OrderWithUserAndProducts | null>;
  findByIdInSystem(id: string): Promise<OrdersModel | null>;
  findAllByUserId(userId: string, limit: number, offset: number): Promise<OrderWithUserAndProducts[] | null>;
  updateOrder(orderId: string, orderData: Partial<Orders>): Promise<Orders | null>;
  updateStatus(orderId: string, status: statusTypes): Promise<string | null>
  deleteOrder(id: string): Promise<boolean | null>;
  findProductInOrder(orderId: string, productId: string): Promise<OrderHasProducts | null>
  findAll(limit: number, offset: number): Promise<OrderWithUserAndProducts[] | null>;
}
