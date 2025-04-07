import OrderDTO from "../../../../infraestructure/dtos/OrderDTO";

export default interface ICreateOrder {
  execute(orderDTO: OrderDTO): Promise<boolean | null>
}