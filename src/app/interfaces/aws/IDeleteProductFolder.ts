export interface IDeleteProductFolder {
  execute(userId: string, productId: string): Promise<void>;
}
