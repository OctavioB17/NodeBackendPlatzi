import OrderHasProductsDTO from "../../../../infraestructure/dtos/orders/OrderHasProductsDTO";

export default interface IModifyQuantityInOrder {
  execute(order: { orderHasProducts: OrderHasProductsDTO[] }): Promise<OrderHasProductsDTO[] | null>
}