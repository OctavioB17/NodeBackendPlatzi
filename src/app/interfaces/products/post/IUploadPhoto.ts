export default interface IUploadProductPhoto {
  execute(userId: string, file: Buffer, productId: string, mimetype: string): Promise<string>
}