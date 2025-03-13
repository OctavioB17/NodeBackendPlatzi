import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";

export default interface IFindAllByCategory {
  execute(categoryId: string): Promise<ProductDTO[] | null>
}