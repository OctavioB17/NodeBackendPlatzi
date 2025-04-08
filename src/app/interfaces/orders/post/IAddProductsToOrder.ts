import OrderHasProductsDTO from "../../../../infraestructure/dtos/OrderHasProductsDTO";

export default interface IAddProductsToOrder {
  execute(orderHasProductsDto: OrderHasProductsDTO | OrderHasProductsDTO[]): Promise<OrderHasProductsDTO[] | null>
}