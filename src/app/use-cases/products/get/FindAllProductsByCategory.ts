import { inject, injectable } from "inversify";
import {PRODUCT_TYPES} from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IProductRepository from "../../../../domain/repositories/IProductsRepository";
import IFindAllProductByCategory from "../../../interfaces/products/get/IFindAllProductByCategory";
import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/product/ProductWithUserAndCategoryDTO";
import PaginationMapper from "../../../../infraestructure/mappers/PaginationMapper";
import { IPagination } from "../../../../domain/interfaces/IPagination";
import { validatePaginationParams } from "../../../../infraestructure/utils/ValidatePaginationParams";


@injectable()
export default class FindAllProductsByCategory implements IFindAllProductByCategory {
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository) private iProductRepository: IProductRepository,
  ) {}

  async execute(categoryId: string, limit: number, offset: number): Promise<IPagination<ProductWithUserAndCategoryDTO[]> | null> {
    try {
      const { limit: validatedLimit, offset: validatedOffset } = validatePaginationParams(limit, offset);

      const products = await this.iProductRepository.findAllByCategory(categoryId, validatedLimit, validatedOffset)
      if (!products) {
        throw new BoomError({
          message: `Product not found`,
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
