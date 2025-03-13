import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";

export default interface IUpdateStock {
  execute(productId: string, stock: number): Promise<ProductDTO | null>
}