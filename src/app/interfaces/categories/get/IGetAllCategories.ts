import CategoryDTO from "../../../../infraestructure/dtos/CategoryDTO";

export default interface IFindAllCategories {
  execute(): Promise<CategoryDTO[] | null>
}