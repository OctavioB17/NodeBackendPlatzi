import CategoryDTO from "../../../../infraestructure/dtos/CategoryDTO";

export default interface IFindCategoryById {
  execute(categoryId: string): Promise<CategoryDTO | null>
}