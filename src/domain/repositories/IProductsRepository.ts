import ProductModel from "../../infraestructure/database/models/ProductsModel";
import ProductWithUserAndCategoryDTO from "../../infraestructure/dtos/product/ProductWithUserAndCategoryDTO";
import Product from "../entities/Products";

export default interface IProductRepository {
  createProduct(product: Product): Promise<boolean | null>
  findById(id: string): Promise<ProductWithUserAndCategoryDTO | null>
  findByIdInSystem(id: string): Promise<ProductModel | null>
  findByName(email: string, limit: number, offset: number, maxPrice: number, minPrice: number): Promise<ProductWithUserAndCategoryDTO[] | null>;
  findAllByUserId(userId: string, limit: number, offset: number, maxPrice: number, minPrice: number, showPaused?: boolean): Promise<ProductWithUserAndCategoryDTO[] | null>;
  findAllByCategory(categoryId: string, limit: number, offset: number, maxPrice: number, minPrice: number): Promise<ProductWithUserAndCategoryDTO[] | null>;
  updateProduct(productId: string, productData: Partial<Product>): Promise<Product | null>;
  deleteProduct(id: string): Promise<boolean | null>;
  updateStock(id: string, stock: number): Promise<Product | null>;
  updatePhotos(id: string, photos: string[]): Promise<Product | null>;
  toggleProductPause(id: string): Promise<Product | null>;
  findAllRandomized(limit: number, offset: number, maxPrice: number, minPrice: number, showPaused?: boolean): Promise<Product[] | null>
}
