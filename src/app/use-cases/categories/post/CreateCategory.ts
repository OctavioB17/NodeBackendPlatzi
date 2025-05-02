import { inject, injectable } from "inversify";
import CategoryDTO from "../../../../infraestructure/dtos/category/CategoryDTO";
import ICreateCategory from "../../../interfaces/categories/post/ICreateCategory";
import { AWS_TYPES, CATEGORY_TYPES, UTIL_TYPES } from "../../../../types";
import { ICategoriesRepository } from "../../../../domain/repositories/ICategoryRepository";
import CategoryMapper from "../../../../infraestructure/mappers/CategoriesMapper";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import { IIdGenerator } from "../../../../infraestructure/services/interfaces/IIdGenerator";
import ICategoryMapper from "../../../../infraestructure/mappers/interfaces/ICategoriesMapper";
import IUploadFileToS3 from "../../../interfaces/aws/IUploadFileToS3";
import ICreateFolderInS3 from "../../../interfaces/aws/ICreateFolderInS3";
import IChangeImageDimensions from "../../../interfaces/utils/images/IChangeImageDimensions";
import IChangeImageFormat from "../../../interfaces/utils/images/IChangeImageFormat";

@injectable()
export default class CreateCategory implements ICreateCategory {
  constructor(
    @inject(CATEGORY_TYPES.ICategoriesRepository) private categoryRepository: ICategoriesRepository,
    @inject(UTIL_TYPES.IIdGenerator) private idGenerator: IIdGenerator,
    @inject(CATEGORY_TYPES.ICategoryMapper) private categoryMapper: ICategoryMapper,
    @inject(AWS_TYPES.IUploadFileToS3) private uploadFileToS3: IUploadFileToS3,
    @inject(AWS_TYPES.ICreateFolderInS3) private createFolderInS3: ICreateFolderInS3,
    @inject(UTIL_TYPES.IChangeImageFormat) private changeFormat: IChangeImageFormat
  ) {}

  async execute(categoryDto: CategoryDTO, file: Express.Multer.File): Promise<boolean | null> {
    try {
      const categoryId = this.idGenerator.generate()
      const category = await this.categoryRepository.getCategoryByName(categoryDto.name)
      if (category) {
        throw new BoomError({
          message: `Category already created`,
          type: ErrorType.VALIDATION_ERROR,
          statusCode: 400
        });
      }
      await this.createFolderInS3.execute(categoryId)
      const imageWebp = await this.changeFormat.execute(file.buffer, 'webp')
      if (!imageWebp) {
        throw new BoomError({
          message: `Failed to change photo format`,
          type: ErrorType.VALIDATION_ERROR,
          statusCode: 400
        });
      }
      const imageUrl = await this.uploadFileToS3.execute(`${categoryId}/${this.idGenerator.generate()}`, imageWebp, 'webp')
      const newCategory = {
        ...categoryDto,
        id: categoryId,
        imageUrl: imageUrl
      };
      const categoryMap = this.categoryMapper.dtoToCategory(newCategory)
      const categoryCreation = await this.categoryRepository.createCategory(categoryMap)
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
