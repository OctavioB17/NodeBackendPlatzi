import { classToPlain, instanceToPlain, plainToInstance } from "class-transformer";

import CategoryDTO from "../dtos/category/CategoryDTO";
import CategoriesModel from "../database/models/CategoriesModel";
import ICategoryMapper from "./interfaces/ICategoriesMapper";
import Category from "../../domain/entities/Categories";
import { IPagination } from "../../domain/interfaces/IPagination";
export default class CategoryMapper implements ICategoryMapper {
  categoryWPaginationToDto(category: IPagination<Category>): IPagination<CategoryDTO> {
    return {
      ...category,
      data: plainToInstance(CategoryDTO, category.data)
    };
  }
  categoryWPaginationToDtoList(categories: IPagination<Category[]>): IPagination<CategoryDTO[]> {
    return {
      ...categories,
      data: categories.data.map(category => plainToInstance(CategoryDTO, category))
    };
  }

  categoryToDto(category: Category): CategoryDTO {
    return plainToInstance(CategoryDTO, category)
  }

  categoryToDtoList(categories: Category[]): CategoryDTO[] {
    return categories.map(category => this.categoryToDto(category));
  }

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


  categoryToModelNoId(category: Category): CategoriesModel {
    const plainCategory = instanceToPlain(category);
    delete plainCategory.id;
    return plainToInstance(CategoriesModel, plainCategory);
  }

  categoryToModelNoIdList(categories: Category[]): CategoriesModel[] {
    return categories.map(category => this.categoryToModelNoId(category))
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

  partialCategoryToModel(partialDtoModel: Partial<Category>): Partial<CategoriesModel> {
    return plainToInstance(CategoriesModel, partialDtoModel);
  }

  partialCategoryDtoToModel(partialDtoModel: Partial<CategoryDTO>): Partial<CategoriesModel> {
    return plainToInstance(CategoriesModel, partialDtoModel);
  }

  partialCategoryModelToDto(partialCategoryModel: Partial<CategoriesModel>): Partial<CategoryDTO> {
    return plainToInstance(CategoryDTO, partialCategoryModel);
  }
}
