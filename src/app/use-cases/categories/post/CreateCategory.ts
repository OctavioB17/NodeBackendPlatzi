import { inject, injectable } from "inversify";
import CategoryDTO from "../../../../infraestructure/dtos/CategoryDTO";
import ICreateCategory from "../../../interfaces/categories/post/ICreateCategory";
import { CATEGORY_TYPES, UTIL_TYPES } from "../../../../types";
import { ICategoriesRepository } from "../../../../domain/repositories/ICategoryRepository";
import CategoryMapper from "../../../../infraestructure/mappers/CategoriesMapper";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import { IIdGenerator } from "../../../../domain/services/utils/IIdGenerator";

@injectable()
export default class CreateCategory implements ICreateCategory {
  constructor(
    @inject(CATEGORY_TYPES.ICategoriesRepository) private categoryRepository: ICategoriesRepository,
    @inject(UTIL_TYPES.IIdGenerator) private idGenerator: IIdGenerator
  ) {}

  async execute(categoryDto: CategoryDTO): Promise<boolean | null> {
    try {
      const category = await this.categoryRepository.getCategoryByName(categoryDto.name)
      if (category) {
        throw new BoomError({
          message: `Category already created`,
          type: ErrorType.VALIDATION_ERROR,
          statusCode: 400
        });
      }
      const newCategory: CategoryDTO = {
        ...categoryDto,
        id: this.idGenerator.generate(),
      };
      const dtoToModel = CategoryMapper.categoryDTOToModel(newCategory)
      const categoryCreation = await this.categoryRepository.createCategory(dtoToModel.dataValues)
      if (categoryCreation) {
        return true
      } else {
        return false
      }
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