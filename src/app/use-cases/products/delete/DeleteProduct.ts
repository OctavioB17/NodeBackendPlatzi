import IDeleteProduct from "../../../interfaces/products/delete/IDeleteProduct";

export default class DeleteProduct implements IDeleteProduct {
  execute(productId: string): Promise<boolean | null> {
    throw new Error("Method not implemented.");
  }

}