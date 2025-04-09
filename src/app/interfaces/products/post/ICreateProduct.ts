import ProductDTO from "../../../../infraestructure/dtos/product/ProductDTO";

export default interface ICreateProduct {
  execute(productDto: ProductDTO): Promise<boolean | null>
}
