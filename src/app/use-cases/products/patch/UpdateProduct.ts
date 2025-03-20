import { inject, injectable } from "inversify";
import {PRODUCT_TYPES} from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IProductRepository from "../../../../domain/repositories/IProductRepository";
import IUpdateProduct from "../../../interfaces/products/patch/IUpdateProduct";
import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";
import ProductMapper from "../../../../infraestructure/mappers/ProductMapper";

@injectable()
export default class UpdateProduct implements IUpdateProduct {
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository) private iProductRepository: IProductRepository,
  ) {}

  async execute(productId: string, productData: Partial<ProductDTO>): Promise<Partial<ProductDTO> | null> {
    try {
      const userModel = ProductMapper.partialProductDtoToModel(productData)
      const result = await this.iProductRepository.updateProduct(productId, userModel);

      if (!result) {
        throw new BoomError({
          message: `Product not found or can not be updated`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }

      return ProductMapper.partialProductModelToDto(result);
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
