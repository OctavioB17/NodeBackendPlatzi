import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/ProductWithUserAndCategoryDTO";

export default interface IFindProductsByName {
  execute(productName: string): Promise<ProductWithUserAndCategoryDTO[] | null>
}
