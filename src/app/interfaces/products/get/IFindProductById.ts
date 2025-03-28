import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/ProductWithUserAndCategoryDTO";

export default interface IFindProductById{
  execute(id: string): Promise<ProductWithUserAndCategoryDTO | null>
}
