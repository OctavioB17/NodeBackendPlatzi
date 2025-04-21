import ProductDTO from "../../../../infraestructure/dtos/product/ProductDTO";

export default interface ICreateProduct {
  execute(productDto: ProductDTO, userId: string): Promise<boolean | null>
}
