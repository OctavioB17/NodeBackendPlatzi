import ProductModel from "../../infraestructure/database/models/ProductsModel";
import ProductWithUserAndCategoryDTO from "../../infraestructure/dtos/ProductWithUserAndCategoryDTO";
import Product from "../entities/Products";

export default interface IProductRepository {
  createProduct(product: Product): Promise<boolean | null>
  findById(id: string): Promise<ProductWithUserAndCategoryDTO | null>
  findByIdInSystem(id: string): Promise<ProductModel | null>
  findByName(email: string): Promise<ProductWithUserAndCategoryDTO[] | null>;
  findAllByUserId(userId: string): Promise<ProductWithUserAndCategoryDTO[] | null>;
  findAllByCategory(categoryId: string): Promise<ProductWithUserAndCategoryDTO[] | null>;
  updateProduct(productId: string, productData: Partial<Product>): Promise<Product | null>;
  deleteProduct(id: string): Promise<boolean | null>;
  updateStock(id: string, stock: number): Promise<Product | null>;
  toggleProductPause(id: string, status: boolean): Promise<Product | null>;
}