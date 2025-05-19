import { inject, injectable } from "inversify";
import {PRODUCT_TYPES, AWS_TYPES} from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IProductRepository from "../../../../domain/repositories/IProductsRepository";
import IUpdateProduct from "../../../interfaces/products/patch/IUpdateProduct";
import ProductDTO from "../../../../infraestructure/dtos/product/ProductDTO";
import IProductMapper from "../../../../infraestructure/mappers/interfaces/IProductMapper";
import Product from "../../../../domain/entities/Products";
import IDeleteProductPhoto from "../../../interfaces/products/delete/IDeleteProductPhoto";
import IUploadFileToS3 from "../../../interfaces/aws/IUploadFileToS3";
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export default class UpdateProduct implements IUpdateProduct {
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository) private iProductRepository: IProductRepository,
    @inject(PRODUCT_TYPES.IProductMapper) private productMapper: IProductMapper,
    @inject(PRODUCT_TYPES.IDeleteProductPhoto) private deleteProductPhoto: IDeleteProductPhoto,
    @inject(AWS_TYPES.IUploadFileToS3) private uploadFileToS3: IUploadFileToS3
  ) {}

  async execute(productId: string, productData: Partial<ProductDTO>, files?: Express.Multer.File[]): Promise<Partial<Product> | null> {
    try {
      const currentProduct = await this.iProductRepository.findByIdInSystem(productId);
      console.log('Producto actual:', currentProduct?.dataValues);

      if (!currentProduct) {
        throw new BoomError({
          message: `Product not found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }

      const partialToProduct = this.productMapper.partialProductDtoToProduct(productData)
      const result = await this.iProductRepository.updateProduct(productId, partialToProduct);

      if (!result) {
        throw new BoomError({
          message: `Product can not be updated`,
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }

      if (files && files.length > 0) {
        console.log('Archivos recibidos:', files);
        const currentPhotos = currentProduct.dataValues.imageGallery || [];
        console.log('Fotos actuales:', currentPhotos);

        // Eliminar fotos actuales de S3
        await Promise.all(
          currentPhotos.map(photoUrl => {
            console.log('Procesando URL:', photoUrl);
            if (!photoUrl) {
              console.log('URL es null o undefined');
              return Promise.resolve();
            }
            const photoKey = photoUrl.split('/').pop() || '';
            console.log('PhotoKey extraído:', photoKey);
            if (photoKey) {
              return this.deleteProductPhoto.execute(currentProduct.dataValues.userId, photoKey);
            }
            return Promise.resolve();
          })
        );

        // Subir nuevas fotos a S3
        const photos = await Promise.all(
          files.map(async file => {
            const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
            const fileKey = `${currentProduct.dataValues.userId}/${fileName}`;
            const photoUrl = await this.uploadFileToS3.execute(fileKey, file.buffer, file.mimetype);
            return photoUrl;
          })
        );
        console.log('Nuevas fotos a guardar:', photos);
        await this.iProductRepository.updatePhotos(productId, photos);
      }

      return result;
    } catch (error) {
      console.log('Error completo:', error);
      if (error instanceof BoomError) {
        throw error;
      }

      throw new BoomError({
        message: `Error updating product`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}
