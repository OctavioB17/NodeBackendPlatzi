import { inject, injectable } from "inversify";
import {PRODUCT_TYPES} from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IProductRepository from "../../../../domain/repositories/IProductsRepository";
import IFindAllProductsByUser from "../../../interfaces/products/get/IFindAllProductsByUser";
import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/product/ProductWithUserAndCategoryDTO";
import { IPagination } from "../../../../domain/interfaces/IPagination";
import PaginationMapper from "../../../../infraestructure/mappers/PaginationMapper";
import { validatePaginationParams } from "../../../../infraestructure/utils/ValidatePaginationParams";


@injectable()
export default class FindAllProductsByUser implements IFindAllProductsByUser {
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository) private iProductRepository: IProductRepository,
  ) {}

  async execute(userId: string, limit: number, offset: number): Promise<IPagination<ProductWithUserAndCategoryDTO[]>> {

    try {
      const { limit: validatedLimit, offset: validatedOffset } = validatePaginationParams(limit, offset);

      const products = await this.iProductRepository.findAllByUserId(userId, validatedLimit, validatedOffset)
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
        message: `Error finding user`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      })
    }
  }
}
