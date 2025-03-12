import { IProduct } from "../interfaces/products/IProducts";

export interface IProductRepository {
  createProduct(product: IProduct): Promise<boolean>
  findById(id: string): Promise<IProduct | null>
  findByName(email: string): Promise<IProduct | null>;
  findAll(): Promise<IProduct[] | null>;
  updateProduct(product: IProduct): Promise<IProduct | null>
  deleteProduct(id: string): Promise<boolean>
  findByCategory(categoryId: string): Promise<IProduct[] | null>
  updateStock(id: string, stock: number): Promise<IProduct | null>
  toggleProductPause(id: string): Promise<IProduct | null>
}