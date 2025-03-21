import CategoryDTO from "../../../../infraestructure/dtos/CategoryDTO";

export default interface IUpdateProduct {
  execute(categoryId: string, categoryData: Partial<CategoryDTO>): Promise<Partial<CategoryDTO> | null>
}