import { inject } from "inversify";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import CategoryDTO from "../../../../infraestructure/dtos/CategoryDTO";
import IGetCategoryByName from "../../../interfaces/categories/get/IGetCategoryByName";
import { CATEGORY_TYPES } from "../../../../types";
import { ICategoriesRepository } from "../../../../domain/repositories/ICategoryRepository";

export default class GetCategoryByName implements IGetCategoryByName {

  constructor(
    @inject(CATEGORY_TYPES.ICategoriesRepository) private categoryRepository: ICategoriesRepository
  ) {}


  execute(name: string): Promise<CategoryDTO | null> {
    try {
      const category = this.categoryRepository.getCategoryByName(name);
      if (!category) {
        throw new BoomError({
          message: `Categories not found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }

     return category
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