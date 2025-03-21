import { inject, injectable } from "inversify";
import {PRODUCT_TYPES, UTIL_TYPES} from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IProductRepository from "../../../../domain/repositories/IProductRepository";
import ICreateProduct from "../../../interfaces/products/post/ICreateProduct";
import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";
import ProductMapper from "../../../../infraestructure/mappers/ProductMapper";
import { IIdGenerator } from "../../../../domain/services/utils/IIdGenerator";

@injectable()
export default class CreateProduct implements ICreateProduct {
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository) private iProductRepository: IProductRepository,
    @inject(UTIL_TYPES.IIdGenerator) private idGenerator: IIdGenerator
  ) {}

  async execute(productDto: ProductDTO): Promise<boolean | null> {
    try {
      const newProduct: ProductDTO = {
        ...productDto,
        id: this.idGenerator.generate(),
      }

      const dtoToModel = await ProductMapper.productDtoToModel(newProduct)
      const result = await this.iProductRepository.createProduct(dtoToModel);

      if (!result) {
        throw new BoomError({
          message: `Product not found or could not be deleted`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }

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
