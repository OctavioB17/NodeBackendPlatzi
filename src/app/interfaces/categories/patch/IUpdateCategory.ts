import Category from "../../../../domain/entities/Categories";
import CategoryDTO from "../../../../infraestructure/dtos/CategoryDTO";

export default interface IUpdateCategory {
  execute(categoryId: string, categoryData: Partial<CategoryDTO>): Promise<Partial<Category> | null>
}