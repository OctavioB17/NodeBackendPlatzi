import CategoryDTO from "../../../../infraestructure/dtos/CategoryDTO";

export default interface IGetCategoryByName {
  execute(name: string): Promise<CategoryDTO | null>
}