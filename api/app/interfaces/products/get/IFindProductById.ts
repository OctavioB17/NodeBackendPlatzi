import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/product/ProductWithUserAndCategoryDTO";

export default interface IFindProductById{
  execute(id: string): Promise<ProductWithUserAndCategoryDTO | null>
}
