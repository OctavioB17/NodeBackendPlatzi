import CategoryDTO from "../../../../infraestructure/dtos/CategoryDTO";
export default interface IFindAllProductByCategory {
  execute(categoryId: string): Promise<CategoryDTO[] | null>
}