import ProductModel from "../../infraestructure/database/models/ProductsModel";
import ProductWithUserAndCategoryDTO from "../../infraestructure/dtos/product/ProductWithUserAndCategoryDTO";
import Product from "../entities/Products";
import { OrderType } from "../interfaces/OrderType";

export default interface IProductRepository {
  createProduct(product: Product): Promise<boolean | null>
  findById(id: string): Promise<ProductWithUserAndCategoryDTO | null>
  findByIdInSystem(id: string): Promise<ProductModel | null>
  findByName(email: string, limit: number, offset: number, maxPrice: number, minPrice: number, categoryId?: string, nameOrder?: string, priceOrder?: string): Promise<ProductWithUserAndCategoryDTO[] | null>;
  findAllByUserId(userId: string, limit: number, offset: number, maxPrice: number, minPrice: number, showPaused: boolean, categoryId?: string, createdAt?: string, nameOrder?: string, priceOrder?: string): Promise<ProductWithUserAndCategoryDTO[]>;
  findAllByCategory(categoryId: string, limit: number, offset: number, maxPrice: number, minPrice: number, nameOrder?: string, priceOrder?: string): Promise<ProductWithUserAndCategoryDTO[] | null>;
  updateProduct(productId: string, productData: Partial<Product>): Promise<Product | null>;
  deleteProduct(id: string): Promise<boolean | null>;
  updateStock(id: string, stock: number): Promise<Product | null>;
  updatePhotos(id: string, photos: string[]): Promise<Product | null>;
  toggleProductPause(id: string): Promise<Product | null>;
  findAllRandomized(limit: number, offset: number, maxPrice: number, minPrice: number, showPaused?: boolean, categoryId?: string, nameOrder?: string, priceOrder?: string): Promise<Product[] | null>
}
