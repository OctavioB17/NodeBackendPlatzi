import { statusTypes } from "../../../../domain/interfaces/orders/OrdersTypes";

export default interface IUpdateStatus {
  execute(orderId: string, status: statusTypes): Promise<string | null>
 }