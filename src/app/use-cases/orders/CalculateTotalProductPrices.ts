import { inject, injectable } from "inversify";
import OrderHasProducts from "../../../domain/entities/OrderHasProducts";
import ICalculateTotalProductPrices from "../../interfaces/orders/ICalculateTotalProductPrices";
import { PRODUCT_TYPES } from "../../../types";
import IFindProductById from "../../interfaces/products/get/IFindProductById";
import OrderHasProductsDTO from "../../../infraestructure/dtos/orders/OrderHasProductsDTO";

@injectable()
export default class CalculateTotalProductPrices implements ICalculateTotalProductPrices {
  private findProductById: IFindProductById

  constructor(
    @inject(PRODUCT_TYPES.IFindProductById) findProductById: IFindProductById
  ) {
    this.findProductById = findProductById
  }

  async calculate(products: OrderHasProducts[] | OrderHasProductsDTO[]): Promise<number | null> {
    try {
      let sum = 0

      for (const product of products) {
        const productId = product instanceof OrderHasProducts ? product.getProductId() : product.productId
        const productQuantity = product instanceof OrderHasProducts ? product.getQuantity() : product.quantity
        const productItem = await this.findProductById.execute(productId);
        if (!productItem) {
          return null
        }
        const productPriceXQuantity = productItem?.price * productQuantity
        sum += productPriceXQuantity
      }

      return sum
    } catch (error) {
      return null
    }
  }

}