import { inject, injectable } from "inversify";
import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/product/ProductWithUserAndCategoryDTO";
import IFindAllRandomized from "../../../interfaces/products/get/IFindAllRandomized";
import { PRODUCT_TYPES } from "../../../../types";
import IProductRepository from "../../../../domain/repositories/IProductsRepository";
import { validatePaginationParams } from "../../../../infraestructure/services/utils/ValidatePaginationParams";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import ProductDTO from "../../../../infraestructure/dtos/product/ProductDTO";
import IProductMapper from "../../../../infraestructure/mappers/interfaces/IProductMapper";

@injectable()
export default class FindAllRandomized implements IFindAllRandomized {
  private productRepository: IProductRepository
  private productMapper: IProductMapper

  constructor (@inject(PRODUCT_TYPES.IProductRepository) productRepository: IProductRepository, @inject(PRODUCT_TYPES.IProductMapper) productMapper: IProductMapper) {
    this.productRepository = productRepository,
    this.productMapper = productMapper
  }

  async execute(limit?: number, offset?: number, maxPrice?: number, minPrice?: number, showPaused?: boolean): Promise<ProductDTO[] | null> {
    try {
      const { limit: validatedLimit, offset: validatedOffset } = validatePaginationParams(limit, offset);

      const maxPriceValue = maxPrice === undefined || maxPrice === null || isNaN(maxPrice) ? 999999999 : maxPrice;
      const minPriceValue = minPrice === undefined || minPrice === null || isNaN(minPrice) ? 0 : minPrice;

      const productsRandomized = await this.productRepository.findAllRandomized(validatedLimit, validatedOffset, maxPriceValue, minPriceValue, showPaused)
      if (!productsRandomized) {
        throw new BoomError({
          message: `Products not Found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        })
      }

      return this.productMapper.productToDTOList(productsRandomized)
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
