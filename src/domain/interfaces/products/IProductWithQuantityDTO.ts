import ProductModel from "../../../infraestructure/database/models/ProductsModel";

export interface IProductWithQuantityDTO {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  sku: string;
  dimensions: {length: string, width: string, heigth: string} | {length: string, width: string, heigth: string}[] | null;
  weight: number;
  price: number;
  stock: number;
  categoryId: string;
  material: string[];
  isPaused: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
}

export interface ProductWithJoin extends ProductModel {
  OrderHasProductsModel?: {
    quantity: number
  }
}