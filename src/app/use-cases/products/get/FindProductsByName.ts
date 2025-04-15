import { inject, injectable } from "inversify";
import {PRODUCT_TYPES} from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IProductRepository from "../../../../domain/repositories/IProductsRepository";
import IFindProductsByName from "../../../interfaces/products/get/IFindProductByName";
import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/product/ProductWithUserAndCategoryDTO";
import { IPagination } from "../../../../domain/interfaces/IPagination";
import PaginationMapper from "../../../../infraestructure/mappers/PaginationMapper";
import { validatePaginationParams } from "../../../../infraestructure/utils/ValidatePaginationParams";


@injectable()
export default class FindProductsByName implements IFindProductsByName {
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository) private iProductRepository: IProductRepository,
  ) {}

  async execute(productName: string, limit: number, offset: number, maxPrice: number, minPrice: number): Promise<IPagination<ProductWithUserAndCategoryDTO[]> | null> {
    try {
      const { limit: validatedLimit, offset: validatedOffset } = validatePaginationParams(limit, offset);

      const maxPriceValue = maxPrice === undefined || maxPrice === null || isNaN(maxPrice) ? 999999999 : maxPrice;
      const minPriceValue = minPrice === undefined || minPrice === null || isNaN(minPrice) ? 0 : minPrice;

      const products = await this.iProductRepository.findByName(productName, validatedLimit, validatedOffset, maxPriceValue, minPriceValue)
      if (!products) {
        throw new BoomError({
          message: `${productName} not found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        })
      }

      const dataWPagination = PaginationMapper.paginationResponseMapper(products, validatedLimit, validatedOffset)
      return dataWPagination
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
