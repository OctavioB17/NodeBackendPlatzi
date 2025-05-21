import { IPagination } from "../../../../domain/interfaces/IPagination";
import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/product/ProductWithUserAndCategoryDTO";

export default interface IFindProductByName {
  execute(name: string, limit?: number, offset?: number, maxPrice?: number, minPrice?: number, categoryId?: string): Promise<IPagination<ProductWithUserAndCategoryDTO[]> | null>
}
