import { IPagination } from "../../../../domain/interfaces/IPagination";
import { OrderWithUserAndProducts } from "../../../../domain/interfaces/orders/IOrders";


export default interface IFindAllOrdersByUserId {
  execute(userId: string, limit: number, offset: number): Promise<IPagination<OrderWithUserAndProducts[]> | null>
}
