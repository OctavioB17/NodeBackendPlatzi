import Category from "../../../../domain/entities/Categories";

export default interface IGetCategoryByName {
  execute(name: string): Promise<Category | null>
}