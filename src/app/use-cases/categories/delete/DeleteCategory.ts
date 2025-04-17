import { inject, injectable } from "inversify";
import IDeleteCategory from "../../../interfaces/categories/delete/IDeleteCategory";
import { CATEGORY_TYPES } from "../../../../types";
import { ICategoriesRepository } from "../../../../domain/repositories/ICategoryRepository";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";

@injectable()
export default class DeleteCategory implements IDeleteCategory {
  constructor(
    @inject(CATEGORY_TYPES.ICategoriesRepository) private categoryRepository: ICategoriesRepository
  ) {}

  async execute(categoryId: string): Promise<boolean | null> {
    try {
      const deleteCategory = await this.categoryRepository.deleteCategory(categoryId);
      if (!deleteCategory) {
        throw new BoomError({
          message: `Categories not found or unable to delete`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }

      return deleteCategory
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
