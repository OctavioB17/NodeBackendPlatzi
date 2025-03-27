import { inject } from "inversify";
import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";
import IToggleProductPause from "../../../interfaces/products/patch/IToggleProductPause";
import { PRODUCT_TYPES } from "../../../../types";
import IProductRepository from "../../../../domain/repositories/IProductRepository";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";

export default class ToggleProductPause implements IToggleProductPause {
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository) private iProductRepository: IProductRepository,
  ) {}

  execute(productId: string, status: boolean): Promise<ProductDTO | null> {
    try {
      const productPause = this.iProductRepository.toggleProductPause(productId, status)
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
