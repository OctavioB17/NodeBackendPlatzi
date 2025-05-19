export default interface IDeleteProduct {
  execute(userId: string, productId: string): Promise<boolean>;
}
