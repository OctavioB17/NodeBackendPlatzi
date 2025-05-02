export interface IAwsServices {
  createFolder(folderName: string): Promise<void>
  uploadFile(file: Buffer, fileKey: string, mimetype: string): Promise<string >
  deleteFile(fileKey: string): Promise<void>
  deleteFolder(folderName: string): Promise<void>
}