export default interface IUploadFileToS3 {
  execute(userId: string, file: Buffer, fileName: string, mimeType: string): Promise<string>
}