export interface IAwsServices {
  createFolder(folderName: string): Promise<void>
  uploadFile(userId: string, file: Buffer, fileName: string, mimetype: string): Promise<string >
  deleteFile(userId: string, filename: string): Promise<void>
  deleteFolder(folderName: string): Promise<void>
}