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
      const productIds = products.map(orderProduct => orderProduct instanceof OrderHasProducts ? orderProduct.getProductId() : orderProduct.productId);
      const productPromises = productIds.map(id => this.findProductById.execute(id));
      const productsData = await Promise.all(productPromises);

      const productSum = productsData.reduce((sum, product) => {
        return sum + (product?.price || 0);
      }, 0);

      return productSum
    } catch (error) {
      return null
    }
  }

}