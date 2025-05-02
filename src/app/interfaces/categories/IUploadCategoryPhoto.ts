export default interface IUploadCategoryPhoto {
  execute(categoryId: string, file: Buffer, mimetype: string): Promise<string>
}

