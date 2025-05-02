import CategoryDTO from "../../../../infraestructure/dtos/category/CategoryDTO";

export default interface ICreateCategory {
  execute(categoryDto: CategoryDTO, file: Express.Multer.File): Promise<boolean | null>
}
