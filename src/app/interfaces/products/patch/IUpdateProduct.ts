import ProductModel from "../../../../infraestructure/database/models/ProductsModel";
import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";

export default interface IUpdateProduct {
  execute(product: ProductModel): Promise<ProductDTO | null>
}