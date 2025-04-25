import { inject, injectable } from "inversify";
import { PRODUCT_TYPES, UTIL_TYPES} from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IProductRepository from "../../../../domain/repositories/IProductsRepository";
import ICreateProduct from "../../../interfaces/products/post/ICreateProduct";
import ProductDTO from "../../../../infraestructure/dtos/product/ProductDTO";
import { IIdGenerator } from "../../../../infraestructure/services/interfaces/IIdGenerator";
import IProductMapper from "../../../../infraestructure/mappers/interfaces/IProductMapper";
import IUploadProductPhoto from "../../../interfaces/products/post/IUploadPhoto";

@injectable()
export default class CreateProduct implements ICreateProduct {
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository) private iProductRepository: IProductRepository,
    @inject(UTIL_TYPES.IIdGenerator) private idGenerator: IIdGenerator,
    @inject(PRODUCT_TYPES.IProductMapper) private productMapper: IProductMapper,
    @inject(PRODUCT_TYPES.IUploadProductPhoto) private uploadProductPhoto: IUploadProductPhoto
  ) {}

  async execute(productDto: ProductDTO, userId: string, file: Express.Multer.File ): Promise<boolean | null> {
    try {
      const uuid = this.idGenerator.generate()
      const uploadPhoto = await this.uploadProductPhoto.execute(userId, file.buffer, uuid, file.mimetype)

      if (!uploadPhoto) {
        throw new BoomError({
          message: `Failed to submit product photo`,
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }

      const newProduct: ProductDTO = {
        ...productDto,
        id: uuid,
        userId: userId,
        imageUrl: uploadPhoto
      }

      const dtoToModel = await this.productMapper.dtoToProduct(newProduct)
      const result = await this.iProductRepository.createProduct(dtoToModel);

      if (!result) {
        throw new BoomError({
          message: `Product already created`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }

      return true;
    } catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }

      throw new BoomError({
        message: `Error creating product`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}
