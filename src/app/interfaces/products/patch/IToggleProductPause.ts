import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";

export default interface IToggleProductPause {
  execute(productId: string, status: boolean): Promise<ProductDTO | null>
}