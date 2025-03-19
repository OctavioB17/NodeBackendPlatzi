import { inject, injectable } from "inversify";
import {PRODUCT_TYPES} from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";
import IProductRepository from "../../../../domain/repositories/IProductRepository";
import ProductMapper from "../../../../infraestructure/mappers/ProductMapper";
import IFindProductsByName from "../../../interfaces/products/get/IFindProductByName";


@injectable()
export default class FindProductsByName implements IFindProductsByName {
  constructor(
    @inject(PRODUCT_TYPES.IFindProductByName) private iProductRepository: IProductRepository,
  ) {}

  async execute(productName: string): Promise<ProductDTO[]> {
    try {
      const products = await this.iProductRepository.findByName(productName)
      if (!products) {
        throw new BoomError({
          message: `${productName} not found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        })
      }

      return ProductMapper.productModeltoDTOList(products)
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
