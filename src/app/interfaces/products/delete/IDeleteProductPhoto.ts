export default interface IDeleteProductPhoto {
  execute(userId: string, productId: string): Promise<void>
}