import { plainToInstance } from "class-transformer";

import CategoryDTO from "../dtos/CategoryDTO";
import CategoriesModel from "../database/models/CategoriesModel";

export default class CategoryMapper {
  static categoryModeltoDTO(categoryModel: CategoriesModel): CategoryDTO {
    return plainToInstance(CategoryDTO, categoryModel);
  }

  static categoryModeltoDTOList(categoryModels: CategoriesModel[]): CategoryDTO[] {
    return categoryModels.map(category => this.categoryModeltoDTO(category.dataValues))
  }

  static categoryDTOToModel(CategoryDTO: CategoryDTO): CategoriesModel {
    return plainToInstance(CategoriesModel, CategoryDTO)
  }

  static categoryDTOToModelList(CategoryDTOs: CategoryDTO[]): CategoriesModel[] {
    return CategoryDTOs.map(category => this.categoryDTOToModel(category))
  }

  static partialCategoryDtoToModel(partialDtoModel: Partial<CategoryDTO>): Partial<CategoriesModel> {
    return plainToInstance(CategoriesModel, partialDtoModel);
  }

  static partialCategoryModelToDto(partialCategoryModel: Partial<CategoriesModel>): Partial<CategoryDTO> {
    return plainToInstance(CategoryDTO, partialCategoryModel);
  }
}