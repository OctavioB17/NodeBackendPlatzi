import CategoryDTO from "../../../../infraestructure/dtos/category/CategoryDTO";

export default interface ICreateCategory {
  execute(categoryDto: CategoryDTO): Promise<boolean | null>
}
