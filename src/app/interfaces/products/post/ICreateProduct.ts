import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";

export default interface ICreateProduct {
  execute(productDto: ProductDTO): Promise<boolean | null>
}
