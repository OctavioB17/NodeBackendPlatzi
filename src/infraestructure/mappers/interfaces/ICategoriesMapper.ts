import Category from "../../../domain/entities/Categories";
import CategoriesModel from "../../database/models/CategoriesModel";
import CategoryDTO from "../../dtos/CategoryDTO";

export default interface ICategoryMapper {
  categoryModeltoDTO(categoryModel: CategoriesModel): CategoryDTO

  dtoToCategory(categoryDto: CategoryDTO): Category

  dtoToCategoryList(categoryDto: CategoryDTO[]): Category[]

  modelToCategory(model: CategoriesModel): Category

  modelToCategoryList(model: CategoriesModel[]): Category[]

  categoryToModel(category: Category): CategoriesModel

  categoryToModelList(category: Category[]): CategoriesModel[]

  categoryModeltoDTOList(categoryModels: CategoriesModel[]): CategoryDTO[]

  categoryDTOToModel(CategoryDTO: CategoryDTO): CategoriesModel

  categoryDTOToModelList(CategoryDTOs: CategoryDTO[]): CategoriesModel[]

  partialCategoryDtoToModel(partialDtoModel: Partial<CategoryDTO>): Partial<CategoriesModel>

  partialCategoryModelToDto(partialCategoryModel: Partial<CategoriesModel>): Partial<CategoryDTO>
}