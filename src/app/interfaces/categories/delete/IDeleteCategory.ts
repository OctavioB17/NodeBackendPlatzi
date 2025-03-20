export default interface IDeleteCategory {
  execute(categoryId: string): Promise<boolean | null>
}