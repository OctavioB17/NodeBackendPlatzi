import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/product/ProductWithUserAndCategoryDTO";

export default interface IFindAllProductsByUser {
  execute(userId: string): Promise<ProductWithUserAndCategoryDTO[] | null>
}
