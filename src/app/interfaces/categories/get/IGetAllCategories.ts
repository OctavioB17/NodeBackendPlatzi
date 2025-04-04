import Category from "../../../../domain/entities/Categories";

export default interface IFindAllCategories {
  execute(): Promise<Category[] | null>
}