import Product from "../../domain/entities/Product";
import { ICategories } from "../../domain/interfaces/categories/ICategories";
import { ICategoriesRepository } from "../../domain/repositories/ICategoryRepository";

export default class CategoriesRepository implements ICategoriesRepository {
  createCategory(name: string, description: string): Promise<ICategories> {
    throw new Error("Method not implemented.");
  }
  getCategoryById(id: number): Promise<ICategories | null> {
    throw new Error("Method not implemented.");
  }
  getAllCategories(): Promise<ICategories[]> {
    throw new Error("Method not implemented.");
  }
  updateCategory(id: number, name: string, description: string): Promise<ICategories> {
    throw new Error("Method not implemented.");
  }
  deleteCategory(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  addProductToCategory(categoryId: number, product: Product): Promise<ICategories> {
    throw new Error("Method not implemented.");
  }
  removeProductFromCategory(categoryId: number, productId: number): Promise<ICategories> {
    throw new Error("Method not implemented.");
  }

}