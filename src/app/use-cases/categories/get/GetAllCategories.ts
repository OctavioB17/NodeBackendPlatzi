import { inject, injectable } from "inversify";
import IFindAllCategories from "../../../interfaces/categories/get/IGetAllCategories";
import { CATEGORY_TYPES } from "../../../../types";
import { ICategoriesRepository } from "../../../../domain/repositories/ICategoryRepository";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import Category from "../../../../domain/entities/Categories";
import { IPagination } from "../../../../domain/interfaces/IPagination";
import PaginationMapper from "../../../../infraestructure/mappers/PaginationMapper";
import { validatePaginationParams } from "../../../../infraestructure/services/utils/ValidatePaginationParams";

@injectable()
export default class FindAllCategories implements IFindAllCategories {
  constructor(
    @inject(CATEGORY_TYPES.ICategoriesRepository) private categoryRepository: ICategoriesRepository
  ) {}

  async execute(limit: number, offset: number): Promise<IPagination<Category[]> | null> {
    try {
      const { limit: validatedLimit, offset: validatedOffset } = validatePaginationParams(limit, offset);


      const categories = await this.categoryRepository.getAllCategories(validatedLimit, validatedOffset);
      if (!categories) {
        throw new BoomError({
          message: `Categories not found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }

      const dataWPagination = PaginationMapper.paginationResponseMapper(categories, validatedLimit, validatedOffset)
      return dataWPagination
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