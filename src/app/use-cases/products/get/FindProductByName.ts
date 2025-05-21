import { inject, injectable } from "inversify";
import { PRODUCT_TYPES } from "../../../../types";
import IProductRepository from "../../../../domain/repositories/IProductsRepository";
import IFindProductByName from "../../../interfaces/products/get/IFindProductByName";
import { IPagination } from "../../../../domain/interfaces/IPagination";
import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/product/ProductWithUserAndCategoryDTO";
import { validatePaginationParams } from "../../../../infraestructure/services/utils/ValidatePaginationParams";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import PaginationMapper from "../../../../infraestructure/mappers/PaginationMapper";

@injectable()
export default class FindProductByName implements IFindProductByName {
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository) private iProductRepository: IProductRepository
  ) {}

  async execute(name: string, limit?: number, offset?: number, maxPrice?: number, minPrice?: number, categoryId?: string): Promise<IPagination<ProductWithUserAndCategoryDTO[]>> {
    try {
      const { limit: validatedLimit, offset: validatedOffset } = validatePaginationParams(limit, offset);

      const maxPriceValue = maxPrice === undefined || maxPrice === null || isNaN(maxPrice) ? 999999999 : maxPrice;
      const minPriceValue = minPrice === undefined || minPrice === null || isNaN(minPrice) ? 0 : minPrice;

      const products = await this.iProductRepository.findByName(name, validatedLimit, validatedOffset, maxPriceValue, minPriceValue, categoryId) || []
      if (!products) {
        throw new BoomError({
          message: `Products not found`,
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
        message: `Error finding product`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      })
    }
  }
}
