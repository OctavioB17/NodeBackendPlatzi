import { IPagination } from "../../../../domain/interfaces/IPagination";
import ProductDTO from "../../../../infraestructure/dtos/product/ProductDTO";

export default interface IFindAllRandomized {
  execute(limit?: number, offset?: number, maxPrice?: number, minPrice?: number, showPaused?: boolean, categoryId?: string, nameOrder?: string, priceOrder?: string, createdAt?: string): Promise<IPagination<ProductDTO[]> | null>
}
