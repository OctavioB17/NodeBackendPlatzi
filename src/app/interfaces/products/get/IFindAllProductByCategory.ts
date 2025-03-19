import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";

export default interface IFindAllProductByCategory {
  execute(categoryId: string): Promise<ProductDTO[] | null>
}