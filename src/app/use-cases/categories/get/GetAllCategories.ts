import { inject, injectable } from "inversify";
import CategoryDTO from "../../../../infraestructure/dtos/CategoryDTO";
import IFindAllCategories from "../../../interfaces/categories/get/IGetAllCategories";
import { CATEGORY_TYPES } from "../../../../types";
import { ICategoriesRepository } from "../../../../domain/repositories/ICategoryRepository";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";

@injectable()
export default class FindAllCategories implements IFindAllCategories {
  constructor(
    @inject(CATEGORY_TYPES.ICategoriesRepository) private categoryRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<CategoryDTO[] | null> {
    try {
      const categories = await this.categoryRepository.getAllCategories();
      if (!categories) {
        throw new BoomError({
          message: `Categories not found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }

      return categories
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