export default interface ICreateCategoryFolderInS3 {
  execute(categoryId: string): Promise<void>
}
