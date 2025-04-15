import Product from "../../../../domain/entities/Products";

export default interface IToggleProductPause {
  execute(productId: string): Promise<Product | null>
}
