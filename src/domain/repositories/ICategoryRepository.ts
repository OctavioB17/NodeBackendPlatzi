import Product from "../entities/Product";
import { ICategories } from "../interfaces/categories/ICategories";

export interface ICategoriesRepository {
  createCategory(name: string, description: string): Promise<ICategories>;
  getCategoryById(id: number): Promise<ICategories | null>;
  getAllCategories(): Promise<ICategories[]>;
  updateCategory(id: number, name: string, description: string): Promise<ICategories>;
  deleteCategory(id: number): Promise<void>;
  addProductToCategory(categoryId: number, product: Product): Promise<ICategories>;
  removeProductFromCategory(categoryId: number, productId: number): Promise<ICategories>;
}