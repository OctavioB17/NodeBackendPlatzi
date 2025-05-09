import Product from "../../../../domain/entities/Products";

export default interface IToggleProductPause {
  execute(productIds: string[]): Promise<Product[]>;
}
