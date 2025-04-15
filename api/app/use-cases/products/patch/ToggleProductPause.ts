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

  execute(productId: string): Promise<Product | null> {
    try {
      const productPause = this.iProductRepository.toggleProductPause(productId)
      if (!productPause) {
        throw new BoomError({
          message: `Product not found or can not be updated`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }

      return productPause
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
