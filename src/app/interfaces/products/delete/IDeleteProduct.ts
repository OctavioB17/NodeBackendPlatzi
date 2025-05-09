export default interface IDeleteProduct {
  execute(userId: string, productIds: string[]): Promise<boolean>;
}
