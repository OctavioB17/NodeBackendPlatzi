import ProductDTO from "../../infraestructure/dtos/ProductDTO";
import { IProduct } from "../interfaces/products/IProducts";

export default interface IProductRepository {
  createProduct(product: IProduct): Promise<boolean | null>
  findById(id: string): Promise<ProductDTO | null>
  findByName(email: string): Promise<ProductDTO[] | null>;
  findAllByUserId(userId: string): Promise<ProductDTO[] | null>;
  findAllByCategory(categoryId: string): Promise<ProductDTO[] | null>;
  updateProduct(product: IProduct): Promise<ProductDTO | null>;
  deleteProduct(id: string): Promise<boolean | null>;
  updateStock(id: string, stock: number): Promise<ProductDTO | null>;
  toggleProductPause(id: string): Promise<ProductDTO | null>;
}