import Product from "../../../../domain/entities/Products";

export default interface IUpdatePhotos {
  execute(id: string, photos: string[]): Promise<Product>
}