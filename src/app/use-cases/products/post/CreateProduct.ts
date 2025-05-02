import { inject, injectable } from "inversify";
import { AWS_TYPES, PRODUCT_TYPES, UTIL_TYPES} from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IProductRepository from "../../../../domain/repositories/IProductsRepository";
import ICreateProduct from "../../../interfaces/products/post/ICreateProduct";
import ProductDTO from "../../../../infraestructure/dtos/product/ProductDTO";
import { IIdGenerator } from "../../../../infraestructure/services/interfaces/IIdGenerator";
import IProductMapper from "../../../../infraestructure/mappers/interfaces/IProductMapper";
import IUploadProductPhoto from "../../../interfaces/products/post/IUploadPhoto";
import IChangeDimensionsAndFormat from "../../../interfaces/utils/images/IChangeDimensionsAndFormat";
import { config } from "dotenv";
import IDeleteProductPhoto from "../../../interfaces/products/delete/IDeleteProductPhoto";
config()
@injectable()
export default class CreateProduct implements ICreateProduct {
  private bucketName: string
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository) private iProductRepository: IProductRepository,
    @inject(UTIL_TYPES.IIdGenerator) private idGenerator: IIdGenerator,
    @inject(PRODUCT_TYPES.IProductMapper) private productMapper: IProductMapper,
    @inject(PRODUCT_TYPES.IUploadProductPhoto) private uploadProductPhoto: IUploadProductPhoto,
    @inject(UTIL_TYPES.IChangeDimensionsAndFormat) private changeFormatAndDimensions: IChangeDimensionsAndFormat,
    @inject(PRODUCT_TYPES.IDeleteProductPhoto) private deleteProductPhoto: IDeleteProductPhoto
  ) {
    this.bucketName = process.env.AWS_ASSETS_BUCKET!
  }

  async execute(productDto: ProductDTO, userId: string, file: Express.Multer.File[] ): Promise<boolean | null> {
    let uploadedPhotos: string[] = []
    try {
      const productUuid = this.idGenerator.generate()
      const photoThumbnail = await this.changeFormatAndDimensions.execute(file[0].buffer, 230, 230, 'webp')
      if (!photoThumbnail) {
        throw new BoomError({
          message: `Failed to submit product photo`,
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }
      const thumbnailLocation = `${productUuid}/${this.idGenerator.generate()}`
      const photoThumbnailUpload = await this.uploadProductPhoto.execute(userId, photoThumbnail, thumbnailLocation, file[0].mimetype);
      uploadedPhotos.push(thumbnailLocation);
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
          const photoLocation = `${productUuid}/${this.idGenerator.generate()}`
          const uploadPhotos = this.uploadProductPhoto.execute(userId, photosModified, photoLocation, 'webp');
          uploadedPhotos.push(photoLocation);
          return uploadPhotos
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
      await Promise.all(uploadedPhotos.map(photoUrl => {
        const photoKey = photoUrl
        return this.deleteProductPhoto.execute(userId, photoKey);
      }));


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
