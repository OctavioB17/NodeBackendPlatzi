import { inject } from "inversify";
import ProductDTO from "../../../../infraestructure/dtos/product/ProductDTO";
import { PRODUCT_TYPES } from "../../../../types";
import IUpdateStock from "../../../interfaces/products/patch/IUpdateStock";
import IProductRepository from "../../../../domain/repositories/IProductsRepository";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import Product from "../../../../domain/entities/Products";

export default class UpdateStock implements IUpdateStock {
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository) private iProductRepository: IProductRepository,
  ) {}

  execute(productId: string, stock: number): Promise<Product | null> {
    try {
      const updateStock = this.iProductRepository.updateStock(productId, stock)
      if (!updateStock) {
        throw new BoomError({
          message: `Product not found or can not be updated`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }

      return updateStock
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
