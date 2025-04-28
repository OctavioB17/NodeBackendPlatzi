export default interface IDeleteProductPhoto {
  execute(userId: string, photoAndProductId: string): Promise<void>
}