import { inject, injectable } from "inversify";
import {PRODUCT_TYPES} from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";
import IProductRepository from "../../../../domain/repositories/IProductRepository";
import ProductMapper from "../../../../infraestructure/mappers/ProductMapper";
import IFindProductById from "../../../interfaces/products/get/IFindProductById";


  @injectable()
  export default class FindProductById implements IFindProductById {
    constructor(
      @inject(PRODUCT_TYPES.IProductRepository) private productRepository: IProductRepository,
    ) {}

    async execute(id: string): Promise<ProductDTO> {
      try {
        const products = await this.productRepository.findById(id)
        if (!products) {
          throw new BoomError({
            message: `Product ${id} Not Found`,
            type: ErrorType.NOT_FOUND,
            statusCode: 404
          })
        }

        return ProductMapper.productModeltoDTO(products)
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
