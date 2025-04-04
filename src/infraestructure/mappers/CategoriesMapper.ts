import { plainToInstance } from "class-transformer";

import CategoryDTO from "../dtos/CategoryDTO";
import CategoriesModel from "../database/models/CategoriesModel";
import ICategoryMapper from "./interfaces/ICategoriesMapper";
import Category from "../../domain/entities/Categories";

export default class CategoryMapper implements ICategoryMapper {

  dtoToCategory(categoryDto: CategoryDTO): Category {
    return plainToInstance(Category, categoryDto);
  }

  dtoToCategoryList(categoryDto: CategoryDTO[]): Category[] {
    return categoryDto.map(category => this.dtoToCategory(category))
  }

  categoryToModel(category: Category): CategoriesModel {
    return plainToInstance(CategoriesModel, category);
  }

  categoryToModelList(categories: Category[]): CategoriesModel[] {
    return categories.map(category => this.categoryToModel(category))
  }

  modelToCategory(model: CategoriesModel): Category {
    return plainToInstance(Category, model);
  }

  modelToCategoryList(models: CategoriesModel[]): Category[] {
    return models.map(model => this.modelToCategory(model))
  }


  categoryModeltoDTO(categoryModel: CategoriesModel): CategoryDTO {
    return plainToInstance(CategoryDTO, categoryModel);
  }

  categoryModeltoDTOList(categoryModels: CategoriesModel[]): CategoryDTO[] {
    return categoryModels.map(category => this.categoryModeltoDTO(category.dataValues))
  }

  categoryDTOToModel(CategoryDTO: CategoryDTO): CategoriesModel {
    return plainToInstance(CategoriesModel, CategoryDTO)
  }

  categoryDTOToModelList(CategoryDTOs: CategoryDTO[]): CategoriesModel[] {
    return CategoryDTOs.map(category => this.categoryDTOToModel(category))
  }

  partialCategoryDtoToModel(partialDtoModel: Partial<CategoryDTO>): Partial<CategoriesModel> {
    return plainToInstance(CategoriesModel, partialDtoModel);
  }

  partialCategoryModelToDto(partialCategoryModel: Partial<CategoriesModel>): Partial<CategoryDTO> {
    return plainToInstance(CategoryDTO, partialCategoryModel);
  }
}