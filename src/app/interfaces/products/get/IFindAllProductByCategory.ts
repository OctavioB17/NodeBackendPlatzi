import { IPagination } from "../../../../domain/interfaces/IPagination";
import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/product/ProductWithUserAndCategoryDTO";

export default interface IFindAllProductByCategory {
  execute(categoryId: string, limit?: number, offset?: number, maxPrice?: number, minPrice?: number, nameOrder?: string, priceOrder?: string, createdAt?: string): Promise<IPagination<ProductWithUserAndCategoryDTO[]> | null>
}
