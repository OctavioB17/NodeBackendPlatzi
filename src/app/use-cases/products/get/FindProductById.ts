import { inject, injectable } from "inversify";
import {PRODUCT_TYPES} from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IProductRepository from "../../../../domain/repositories/IProductsRepository";
import IFindProductById from "../../../interfaces/products/get/IFindProductById";
import ProductWithUserAndCategoryDTO from "../../../../infraestructure/dtos/ProductWithUserAndCategoryDTO";


  @injectable()
  export default class FindProductById implements IFindProductById {
    constructor(
      @inject(PRODUCT_TYPES.IProductRepository) private productRepository: IProductRepository,
    ) {}

    async execute(id: string): Promise<ProductWithUserAndCategoryDTO> {
        const products = await this.productRepository.findById(id)
        if (!products) {
          throw new BoomError({
            message: `Product ${id} Not Found`,
            type: ErrorType.NOT_FOUND,
            statusCode: 404
          })
        }
        return products
    }
  }
