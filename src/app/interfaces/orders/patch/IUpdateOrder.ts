import Orders from "../../../../domain/entities/Orders";
import OrderDTO from "../../../../infraestructure/dtos/orders/OrderDTO";

export default interface IUpdateOrder {
 execute(orderId: string, orderData: Partial<OrderDTO>): Promise<Orders | null>
}