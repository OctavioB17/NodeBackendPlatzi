import { inject, injectable } from "inversify";
import {PRODUCT_TYPES} from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";
import IProductRepository from "../../../../domain/repositories/IProductRepository";
import ProductMapper from "../../../../infraestructure/mappers/ProductMapper";
import IFindAllProductsByUser from "../../../interfaces/products/get/IFindAllProductsByUser";


@injectable()
export default class FindAllProductsByUser implements IFindAllProductsByUser {
  constructor(
    @inject(PRODUCT_TYPES.IProductRepository) private iProductRepository: IProductRepository,
  ) {}

  async execute(userId: string): Promise<ProductDTO[]> {
    try {
      const products = await this.iProductRepository.findAllByUserId(userId)
      if (!products) {
        throw new BoomError({
          message: `Products not found`,
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
        message: `Error finding user`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      })
    }
  }
}
