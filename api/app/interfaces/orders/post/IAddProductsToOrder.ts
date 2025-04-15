import OrderHasProductsDTO from "../../../../infraestructure/dtos/orders/OrderHasProductsDTO";

export default interface IAddProductsToOrder {
  execute(orderHasProductsDto: { orderHasProducts: OrderHasProductsDTO[] }, orderId: string): Promise<OrderHasProductsDTO[] | null>
}
