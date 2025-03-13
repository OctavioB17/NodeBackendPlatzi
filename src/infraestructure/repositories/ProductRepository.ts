import { IProduct } from "../../domain/interfaces/products/IProducts";
import IProductRepository from "../../domain/repositories/IProductRepository";
import ProductModel from "../database/models/ProductsModel";

export default class ProductRepository implements IProductRepository {
  createProduct(product: IProduct): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<ProductModel | null> {
    throw new Error("Method not implemented.");
  }
  findByName(email: string): Promise<ProductModel | null> {
    throw new Error("Method not implemented.");
  }
  findAllByUserId(userId: string): Promise<IProduct[] | null> {
    throw new Error("Method not implemented.");
  }
  findAllByCategory(categoryId: string): Promise<ProductModel[] | null> {
    throw new Error("Method not implemented.");
  }
  updateProduct(product: IProduct): Promise<ProductModel | null> {
    throw new Error("Method not implemented.");
  }
  deleteProduct(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  updateStock(id: string, stock: number): Promise<ProductModel | null> {
    throw new Error("Method not implemented.");
  }
  toggleProductPause(id: string): Promise<ProductModel | null> {
    throw new Error("Method not implemented.");
  }

}