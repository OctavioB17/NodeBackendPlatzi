import { inject, injectable } from "inversify";
import {PRODUCT_TYPES} from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IProductRepository from "../../../../domain/repositories/IProductsRepository";
import IDeleteProduct from "../../../interfaces/products/delete/IDeleteProduct";
import { IDeleteProductFolder } from "../../../interfaces/aws/IDeleteProductFolder";

@injectable()
export default class DeleteProduct implements IDeleteProduct {
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository) private iProductRepository: IProductRepository,
    @inject(PRODUCT_TYPES.IDeleteProductFolder) private deleteProductFolder: IDeleteProductFolder
  ) {}

  async execute(userId: string, productId: string): Promise<boolean | null> {
    try {
      const result = await this.iProductRepository.deleteProduct(productId);

      if (!result) {
        throw new BoomError({
          message: `Product not found or could not be deleted`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }

      await this.deleteProductFolder.execute(userId, productId)

      return true;
    } catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }

      throw new BoomError({
        message: `Error deleting product`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}
