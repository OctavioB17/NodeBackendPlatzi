export default interface IDeleteProduct {
  execute(productId: string): Promise<boolean | null>
}