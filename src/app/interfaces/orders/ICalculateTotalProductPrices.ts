import OrderHasProducts from "../../../domain/entities/OrderHasProducts";
import OrderHasProductsDTO from "../../../infraestructure/dtos/orders/OrderHasProductsDTO";

export default interface ICalculateTotalProductPrices {
  calculate(products: OrderHasProducts[] | OrderHasProductsDTO[]): Promise<number | null>
}