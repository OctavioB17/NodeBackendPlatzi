import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";

export default interface IFindAllByUser {
  execute(userId: string): Promise<ProductDTO[] | null>
}