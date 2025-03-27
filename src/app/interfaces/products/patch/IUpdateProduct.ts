import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";

export default interface IUpdateProduct {
  execute(productId: string, productData: Partial<ProductDTO>): Promise<Partial<ProductDTO> | null>
}
