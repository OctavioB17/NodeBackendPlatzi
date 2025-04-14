import { IPagination } from "../../../../domain/interfaces/IPagination";
import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/product/ProductWithUserAndCategoryDTO";

export default interface IFindAllProductsByUser {
  execute(userId: string, limit: number, offset: number): Promise<IPagination<ProductWithUserAndCategoryDTO[]> | null>
}
