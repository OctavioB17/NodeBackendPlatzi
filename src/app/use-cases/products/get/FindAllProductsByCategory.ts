import { inject, injectable } from "inversify";
import {PRODUCT_TYPES} from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IProductRepository from "../../../../domain/repositories/IProductsRepository";
import IFindAllProductByCategory from "../../../interfaces/products/get/IFindAllProductByCategory";
import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/product/ProductWithUserAndCategoryDTO";


@injectable()
export default class FindAllProductsByCategory implements IFindAllProductByCategory {
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository) private iProductRepository: IProductRepository,
  ) {}

  async execute(categoryId: string): Promise<ProductWithUserAndCategoryDTO[]> {
    try {
      const products = await this.iProductRepository.findAllByCategory(categoryId)
      if (!products) {
        throw new BoomError({
          message: `Product not found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        })
      }

      return products
    } catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }
      throw new BoomError({
        message: `Error finding Product`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      })
    }
  }
}
