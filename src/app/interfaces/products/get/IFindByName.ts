import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";

export default interface IFindByName {
  execute(productName: string): Promise<ProductDTO | null>
}