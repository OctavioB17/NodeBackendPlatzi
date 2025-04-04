import Category from "../../../../domain/entities/Categories";

export default interface IFindCategoryById {
  execute(categoryId: string): Promise<Category | null>
}