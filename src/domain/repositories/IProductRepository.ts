import ProductModel from "../../infraestructure/database/models/ProductsModel";
import IProductWithUserAndCategory from "../interfaces/user/IProductWithUserAndCategory";

export default interface IProductRepository {
  createProduct(product: ProductModel): Promise<boolean | null>
  findById(id: string): Promise<IProductWithUserAndCategory | null>
  findByIdInSystem(id: string): Promise<ProductModel | null>
  findByName(email: string): Promise<IProductWithUserAndCategory[] | null>;
  findAllByUserId(userId: string): Promise<IProductWithUserAndCategory[] | null>;
  findAllByCategory(categoryId: string): Promise<IProductWithUserAndCategory[] | null>;
  updateProduct(productId: string, productData: Partial<ProductModel>): Promise<ProductModel | null>;
  deleteProduct(id: string): Promise<boolean | null>;
  updateStock(id: string, stock: number): Promise<ProductModel | null>;
  toggleProductPause(id: string, status: boolean): Promise<ProductModel | null>;
}