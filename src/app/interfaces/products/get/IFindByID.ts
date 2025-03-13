import ProductDTO from "../../../../infraestructure/dtos/ProductDTO";

export default interface IGetProductByID{
  execute(id: string): Promise<ProductDTO | null>
}