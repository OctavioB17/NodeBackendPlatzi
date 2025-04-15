import Category from "../../../domain/entities/Categories";
import { IPagination } from "../../../domain/interfaces/IPagination";
import CategoriesModel from "../../database/models/CategoriesModel";
import CategoryDTO from "../../dtos/category/CategoryDTO";

export default interface ICategoryMapper {

  categoryToModelNoId(category: Category): CategoriesModel

  categoryToModelNoIdList(category: Category[]): CategoriesModel[]

  categoryModeltoDTO(categoryModel: CategoriesModel): CategoryDTO

  dtoToCategory(categoryDto: CategoryDTO): Category

  dtoToCategoryList(categoryDto: CategoryDTO[]): Category[]

  categoryToDto(category: Category): CategoryDTO

  categoryToDtoList(categories: Category[]): CategoryDTO[]

  categoryWPaginationToDto(category: IPagination<Category>): IPagination<CategoryDTO>

  categoryWPaginationToDtoList(categories: IPagination<Category[]>): IPagination<CategoryDTO[]>

  modelToCategory(model: CategoriesModel): Category

  modelToCategoryList(model: CategoriesModel[]): Category[]

  categoryToModel(category: Category): CategoriesModel

  categoryToModelList(category: Category[]): CategoriesModel[]

  categoryModeltoDTOList(categoryModels: CategoriesModel[]): CategoryDTO[]

  categoryDTOToModel(CategoryDTO: CategoryDTO): CategoriesModel

  categoryDTOToModelList(CategoryDTOs: CategoryDTO[]): CategoriesModel[]

  partialCategoryToModel(partialDtoModel: Partial<Category>): Partial<CategoriesModel>

  partialCategoryDtoToModel(partialDtoModel: Partial<CategoryDTO>): Partial<CategoriesModel>

  partialCategoryModelToDto(partialCategoryModel: Partial<CategoriesModel>): Partial<CategoryDTO>
}
