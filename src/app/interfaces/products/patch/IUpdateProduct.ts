import Product from "../../../../domain/entities/Products";
import ProductDTO from "../../../../infraestructure/dtos/product/ProductDTO";

export default interface IUpdateProduct {
  execute(productId: string, productData: Partial<ProductDTO>, files?: Express.Multer.File[]): Promise<Partial<Product> | null>
}
