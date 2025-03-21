import { inject, injectable } from "inversify";
import CategoryDTO from "../../../../infraestructure/dtos/CategoryDTO";
import IFindCategoryById from "../../../interfaces/categories/get/IGetCategoryById";
import { CATEGORY_TYPES } from "../../../../types";
import { ICategoriesRepository } from "../../../../domain/repositories/ICategoryRepository";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";

@injectable()
export default class FindCategoryById implements IFindCategoryById {
  constructor(
    @inject(CATEGORY_TYPES.ICategoriesRepository) private categoryRepository: ICategoriesRepository
  ) {}

  async execute(categoryId: string): Promise<CategoryDTO | null> {
    try {
      const category = this.categoryRepository.getCategoryById(categoryId);
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