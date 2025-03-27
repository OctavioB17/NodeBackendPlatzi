import ProductModel from "../../infraestructure/database/models/ProductsModel";

export default interface IProductRepository {
  createProduct(product: ProductModel): Promise<boolean | null>
  findById(id: string): Promise<ProductModel | null>
  findByIdInSystem(id: string): Promise<ProductModel | null>
  findByName(email: string): Promise<ProductModel[] | null>;
  findAllByUserId(userId: string): Promise<ProductModel[] | null>;
  findAllByCategory(categoryId: string): Promise<ProductModel[] | null>;
  updateProduct(productId: string, productData: Partial<ProductModel>): Promise<ProductModel | null>;
  deleteProduct(id: string): Promise<boolean | null>;
  updateStock(id: string, stock: number): Promise<ProductModel | null>;
  toggleProductPause(id: string, status: boolean): Promise<ProductModel | null>;
}