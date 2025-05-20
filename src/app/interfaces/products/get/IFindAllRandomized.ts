import ProductDTO from "../../../../infraestructure/dtos/product/ProductDTO";

export default interface IFindAllRandomized {
  execute(limit?: number, offset?: number, maxPrice?: number, minPrice?: number, showPaused?: boolean): Promise<ProductDTO[] | null>
}
