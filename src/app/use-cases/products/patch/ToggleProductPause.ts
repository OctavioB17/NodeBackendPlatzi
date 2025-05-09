import { inject } from "inversify";
import IToggleProductPause from "../../../interfaces/products/patch/IToggleProductPause";
import { PRODUCT_TYPES } from "../../../../types";
import IProductRepository from "../../../../domain/repositories/IProductsRepository";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import Product from "../../../../domain/entities/Products";

export default class ToggleProductPause implements IToggleProductPause {
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository) private iProductRepository: IProductRepository,
  ) {}

  async execute(productIds: string[]): Promise<Product[]> {
    try {
      const pausedProducts: Product[] = [];
      for (const productId of productIds) {
        const productPause = await this.iProductRepository.toggleProductPause(productId);
        if (!productPause) {
          throw new BoomError({
            message: `Product with ID ${productId} not found or cannot be updated`,
            type: ErrorType.NOT_FOUND,
            statusCode: 404
          });
        }
        pausedProducts.push(productPause);
      }
      return pausedProducts;
    } catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }

      throw new BoomError({
        message: `Error updating products`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}
