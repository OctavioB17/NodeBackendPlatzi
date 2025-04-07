import { inject, injectable } from "inversify";
import IUpdateProduct from "../../../interfaces/products/patch/IUpdateProduct";
import { CATEGORY_TYPES } from "../../../../types";
import { ICategoriesRepository } from "../../../../domain/repositories/ICategoryRepository";
import CategoryDTO from "../../../../infraestructure/dtos/CategoryDTO";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import ICategoryMapper from "../../../../infraestructure/mappers/interfaces/ICategoriesMapper";
import Category from "../../../../domain/entities/Categories";

@injectable()
export default class UpdateCategory implements IUpdateProduct {
  constructor(
    @inject(CATEGORY_TYPES.ICategoriesRepository) private categoryRepository: ICategoriesRepository,
    @inject(CATEGORY_TYPES.ICategoryMapper) private categoryMapper: ICategoryMapper
  ) {}

  async execute(categoryId: string, categoryData: Partial<CategoryDTO>): Promise<Partial<Category> | null> {
    try {
      const partialDtoToModel = this.categoryMapper.partialCategoryDtoToModel(categoryData) as Partial<Category>;
      const updateProduct = await this.categoryRepository.updateCategory(categoryId, partialDtoToModel);
      if (!updateProduct) {
        throw new BoomError({
          message: `Category not found or could not be updated`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }

      return updateProduct
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