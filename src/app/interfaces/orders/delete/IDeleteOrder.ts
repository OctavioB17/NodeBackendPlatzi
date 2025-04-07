export default interface IDeleteOrder {
  execute(id: string): Promise<boolean | null>
}