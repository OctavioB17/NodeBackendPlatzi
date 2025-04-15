export default interface IDeleteItemInOrder {
  execute(orderHasProductId: string): Promise<Boolean | null>
}