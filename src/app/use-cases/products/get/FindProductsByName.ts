import { inject, injectable } from "inversify";
import {PRODUCT_TYPES} from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IProductRepository from "../../../../domain/repositories/IProductRepository";
import ProductMapper from "../../../../infraestructure/mappers/ProductMapper";
import IFindProductsByName from "../../../interfaces/products/get/IFindProductByName";
import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/ProductWithUserAndCategoryDTO";


@injectable()
export default class FindProductsByName implements IFindProductsByName {
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository) private iProductRepository: IProductRepository,
  ) {}

  async execute(productName: string): Promise<ProductWithUserAndCategoryDTO[]> {
    try {
      const products = await this.iProductRepository.findByName(productName)
      if (!products) {
        throw new BoomError({
          message: `${productName} not found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        })
      }
      const productsDto = ProductMapper.iProductWithUserAndCategoryToProductWithUserAndCategoryDTOList(products);

      return productsDto
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
