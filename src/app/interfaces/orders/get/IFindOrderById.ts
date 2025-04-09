import { OrderWithUserAndProducts } from "../../../../domain/interfaces/orders/IOrders";

export default interface IFindOrderById {
  execute(id: string): Promise<OrderWithUserAndProducts>
}