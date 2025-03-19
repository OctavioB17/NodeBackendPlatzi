import CategoriesModel from "../../infraestructure/database/models/CategoriesModel";
import Product from "../entities/Product";

export interface ICategoriesRepository {
  createCategory(categories: CategoriesModel): Promise<boolean>;
  getCategoryById(id: string): Promise<CategoriesModel | null>;
  getAllCategories(): Promise<CategoriesModel[] | null>;
  updateCategory(id: string, category: Partial<CategoriesModel>): Promise<CategoriesModel | null>;
  deleteCategory(id: string): Promise<boolean>;
}