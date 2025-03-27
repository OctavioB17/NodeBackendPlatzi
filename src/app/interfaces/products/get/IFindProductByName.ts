import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";

export default interface IFindProductsByName {
  execute(productName: string): Promise<ProductDTO[] | null>
}
