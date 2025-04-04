import { inject, injectable } from "inversify";
import {PRODUCT_TYPES, UTIL_TYPES} from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IProductRepository from "../../../../domain/repositories/IProductsRepository";
import ICreateProduct from "../../../interfaces/products/post/ICreateProduct";
import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";
import { IIdGenerator } from "../../../../domain/services/utils/IIdGenerator";
import IProductMapper from "../../../../infraestructure/mappers/interfaces/IProductMapper";

@injectable()
export default class CreateProduct implements ICreateProduct {
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository) private iProductRepository: IProductRepository,
    @inject(UTIL_TYPES.IIdGenerator) private idGenerator: IIdGenerator,
    @inject(PRODUCT_TYPES.IProductMapper) private productMapper: IProductMapper
  ) {}

  async execute(productDto: ProductDTO): Promise<boolean | null> {
    try {
      const newProduct: ProductDTO = {
        ...productDto,
        id: this.idGenerator.generate(),
      }

      const dtoToModel = await this.productMapper.dtoToProduct(newProduct)
      const result = await this.iProductRepository.createProduct(dtoToModel);

      if (!result) {
        throw new BoomError({
          message: `Product already created`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }

      return true;
    } catch (error) {
      console.log(error)
      if (error instanceof BoomError) {
        throw error;
      }

      throw new BoomError({
        message: `Error creating product`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}
