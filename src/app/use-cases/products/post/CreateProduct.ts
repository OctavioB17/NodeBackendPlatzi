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
import IChangeDimensionsAndFormat from "../../../interfaces/utils/images/IChangeDimensionsAndFormat";

@injectable()
export default class CreateProduct implements ICreateProduct {
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository) private iProductRepository: IProductRepository,
    @inject(UTIL_TYPES.IIdGenerator) private idGenerator: IIdGenerator,
    @inject(PRODUCT_TYPES.IProductMapper) private productMapper: IProductMapper,
    @inject(PRODUCT_TYPES.IUploadProductPhoto) private uploadProductPhoto: IUploadProductPhoto,
    @inject(UTIL_TYPES.IChangeDimensionsAndFormat) private changeFormatAndDimensions: IChangeDimensionsAndFormat
  ) {}

  async execute(productDto: ProductDTO, userId: string, file: Express.Multer.File[] ): Promise<boolean | null> {
    try {
      const productUuid = this.idGenerator.generate()
      const photoThumbnail = await this.changeFormatAndDimensions.execute(file[0].buffer, 250, 250, 'webp')
      if (!photoThumbnail) {
        throw new BoomError({
          message: `Failed to submit product photo`,
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }
      const photoThumbnailUpload = await this.uploadProductPhoto.execute(userId, photoThumbnail, `${productUuid}/${this.idGenerator.generate()}`, file[0].mimetype);
      const photosUpload = await Promise.all(
        file.map(async (photos) => {
          const photosModified = await this.changeFormatAndDimensions.execute(photos.buffer, 500, 500, 'webp')
          if (!photosModified) {
            throw new BoomError({
              message: `Failed to submit product photo`,
              type: ErrorType.INTERNAL_ERROR,
              statusCode: 500
            });
          }
          return this.uploadProductPhoto.execute(userId, photosModified, `${productUuid}/${this.idGenerator.generate()}`, photos.mimetype);
        })
      );


      if (!photosUpload) {
        throw new BoomError({
          message: `Failed to submit product photo`,
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }

      const newProduct: ProductDTO = {
        ...productDto,
        id: productUuid,
        userId: userId,
        imageGallery: photosUpload,
        thumbnailUrl: photoThumbnailUpload
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
    } catch (error: any) {
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
