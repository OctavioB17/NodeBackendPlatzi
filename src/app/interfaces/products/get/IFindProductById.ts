import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";

export default interface IFindProductById{
  execute(id: string): Promise<ProductDTO | null>
}
