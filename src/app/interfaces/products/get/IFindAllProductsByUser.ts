import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";

export default interface IFindAllProductsByUser {
  execute(userId: string): Promise<ProductDTO[] | null>
}