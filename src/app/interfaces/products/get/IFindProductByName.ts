import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/product/ProductWithUserAndCategoryDTO";

export default interface IFindProductsByName {
  execute(productName: string): Promise<ProductWithUserAndCategoryDTO[] | null>
}
