import { inject, injectable } from "inversify";
import CategoryDTO from "../../../../infraestructure/dtos/CategoryDTO";
import ICreateCategory from "../../../interfaces/categories/post/ICreateCategory";
import { CATEGORY_TYPES } from "../../../../types";
import { ICategoriesRepository } from "../../../../domain/repositories/ICategoryRepository";
import CategoryMapper from "../../../../infraestructure/mappers/CategoriesMapper";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";

@injectable()
export default class CreateCategory implements ICreateCategory {
  constructor(
    @inject(CATEGORY_TYPES.ICategoriesRepository) private categoryRepository: ICategoriesRepository
  ) {}

  async execute(categoryDto: CategoryDTO): Promise<boolean | null> {
    try {
      const dtoToModel = CategoryMapper.categoryDTOToModel(categoryDto)
      const newCategory = await this.categoryRepository.createCategory(dtoToModel)
      if (!newCategory) {
        throw new BoomError({
          message: `Category not found or could not be deleted`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }

      return true
    } catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }

      throw new BoomError({
        message: `Error creating category`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}