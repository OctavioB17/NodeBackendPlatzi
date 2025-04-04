import Product from "../../../../domain/entities/Products";

export default interface IUpdateStock {
  execute(productId: string, stock: number): Promise<Product | null>
}
