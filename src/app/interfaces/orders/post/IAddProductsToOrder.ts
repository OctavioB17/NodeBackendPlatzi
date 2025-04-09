import OrderHasProductsDTO from "../../../../infraestructure/dtos/orders/OrderHasProductsDTO";

export default interface IAddProductsToOrder {
  execute(orderHasProductsDto: OrderHasProductsDTO | OrderHasProductsDTO[], orderId: string): Promise<OrderHasProductsDTO[] | null>
}
