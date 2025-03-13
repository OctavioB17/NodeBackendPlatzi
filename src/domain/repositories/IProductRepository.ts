import ProductModel from "../../infraestructure/database/models/ProductsModel";
import { IProduct } from "../interfaces/products/IProducts";

export default interface IProductRepository {
  createProduct(product: IProduct): Promise<boolean | null>
  findById(id: string): Promise<ProductModel | null>
  findByName(email: string): Promise<ProductModel | null>;
  findAllByUserId(userId: string): Promise<IProduct[] | null>;
  findAllByCategory(categoryId: string): Promise<ProductModel[] | null>;
  updateProduct(product: IProduct): Promise<ProductModel | null>;
  deleteProduct(id: string): Promise<boolean | null>;
  updateStock(id: string, stock: number): Promise<ProductModel | null>;
  toggleProductPause(id: string): Promise<ProductModel | null>;
}