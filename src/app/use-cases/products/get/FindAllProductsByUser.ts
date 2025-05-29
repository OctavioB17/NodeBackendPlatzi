import { inject, injectable } from "inversify";
import {PRODUCT_TYPES} from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IProductRepository from "../../../../domain/repositories/IProductsRepository";
import IFindAllProductsByUser from "../../../interfaces/products/get/IFindAllProductsByUser";
import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/product/ProductWithUserAndCategoryDTO";
import { IPagination } from "../../../../domain/interfaces/IPagination";
import PaginationMapper from "../../../../infraestructure/mappers/PaginationMapper";
import { validatePaginationParams } from "../../../../infraestructure/services/utils/ValidatePaginationParams";
import { OrderType } from "../../../../domain/interfaces/OrderType";


@injectable()
export default class FindAllProductsByUser implements IFindAllProductsByUser {
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository) private iProductRepository: IProductRepository,
  ) {}

  async execute(userId: string, limit: number, offset: number, maxPrice: number, minPrice: number, showPaused: boolean, categoryId?: string, createdAt?: string, nameOrder?: string, priceOrder?: string): Promise<IPagination<ProductWithUserAndCategoryDTO[]> | null> {
    try {

      const { limit: validatedLimit, offset: validatedOffset } = validatePaginationParams(limit, offset);

      const maxPriceValue = maxPrice && !isNaN(maxPrice) ? maxPrice : 999999999;
      const minPriceValue = minPrice && !isNaN(minPrice) ? minPrice : 0;

      const products = await this.iProductRepository.findAllByUserId(
        userId,
        validatedLimit,
        validatedOffset,
        maxPriceValue,
        minPriceValue,
        showPaused,
        categoryId,
        createdAt as OrderType,
        nameOrder as OrderType,
        priceOrder as OrderType
      );

      if (!products) {
        throw new BoomError({
          message: 'Products not found',
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }

      return PaginationMapper.paginationResponseMapper(products, validatedLimit, validatedOffset);
    } catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }
      throw new BoomError({
        message: 'Error finding products',
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}
