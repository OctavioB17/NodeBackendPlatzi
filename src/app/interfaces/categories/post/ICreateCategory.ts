import CategoryDTO from "../../../../infraestructure/dtos/CategoryDTO";

export default interface ICreateCategory {
  execute(categoryDto: CategoryDTO): Promise<boolean | null>
}