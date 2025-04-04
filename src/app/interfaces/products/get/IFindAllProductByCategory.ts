import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/ProductWithUserAndCategoryDTO";
export default interface IFindAllProductByCategory {
  execute(categoryId: string): Promise<ProductWithUserAndCategoryDTO[] | null>
}