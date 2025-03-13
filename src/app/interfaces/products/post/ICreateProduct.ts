import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";

export default interface ICreateUser {
  execute(productDto: ProductDTO): Promise<boolean | null>
}
