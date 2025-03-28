import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/ProductWithUserAndCategoryDTO";

export default interface IFindAllProductsByUser {
  execute(userId: string): Promise<ProductWithUserAndCategoryDTO[] | null>
}
