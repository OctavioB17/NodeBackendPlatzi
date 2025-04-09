import { OrderWithUserAndProducts } from "../../../../domain/interfaces/orders/IOrders";


export default interface IFindAllOrdersByUserId {
  execute(userId: string): Promise<OrderWithUserAndProducts[] | null>
}