import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";

export default interface IToggleProductPause {
  execute(productId: string): Promise<ProductDTO | null>
}