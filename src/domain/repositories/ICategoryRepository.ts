import CategoriesModel from "../../infraestructure/database/models/CategoriesModel";
import Category from "../entities/Categories";

export interface ICategoriesRepository {
  createCategory(categories: Category): Promise<boolean>;
  getCategoryById(id: string): Promise<Category | null>;
  getCategoryByIdInSystem(id: string): Promise<CategoriesModel | null>
  getCategoryByName(name: string): Promise<Category | null>;
  getAllCategories(): Promise<Category[] | null>;
  updateCategory(id: string, category: Partial<Category>): Promise<Category | null>;
  deleteCategory(id: string): Promise<boolean>;
}
