export default interface IDeleteProduct {
  execute(userId: string, ids: string[]): Promise<boolean>;
}
