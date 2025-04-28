import { inject, injectable } from "inversify";
import Product from "../../../../domain/entities/Products";
import IUpdatePhotos from "../../../interfaces/products/patch/IUpdatePhotos";
import IProductRepository from "../../../../domain/repositories/IProductsRepository";
import { PRODUCT_TYPES } from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";

@injectable()
export default class UpdatePhotos implements IUpdatePhotos {

  private productRepository: IProductRepository

  constructor (@inject(PRODUCT_TYPES.IProductRepository) productRepository: IProductRepository) {
   this.productRepository = productRepository
  }

  async execute(id: string, photos: string[]): Promise<Product> {
    try {
      const product = await this.productRepository.findById(id)
      if (!product) {
        throw new BoomError({
          message: 'Cannot find product',
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        })
      }

      const updatedPhotos = product.imageGallery
      ? [...product.imageGallery, ...photos]
      : [...photos];

      const update = await this.productRepository.updatePhotos(id, updatedPhotos)

      if (!update) {
        throw new BoomError({
          message: 'Cannot update photos',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        })
      }

      return update
    } catch (error) {
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