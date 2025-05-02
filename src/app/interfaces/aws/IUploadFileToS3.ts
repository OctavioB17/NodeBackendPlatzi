export default interface IUploadFileToS3 {
  execute(fileKey: string, file: Buffer, mimeType: string): Promise<string>
}