import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/product/ProductWithUserAndCategoryDTO";

export default interface IFindAllProductByCategory {
  execute(categoryId: string): Promise<ProductWithUserAndCategoryDTO[] | null>
}