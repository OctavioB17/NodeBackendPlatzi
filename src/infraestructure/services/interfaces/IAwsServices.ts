export interface IAwsServices {
  createUserFolder(userId: string): Promise<void>
  uploadFile(userId: string, file: Buffer, fileName: string, mimetype: string): Promise<string >
  deleteFile(userId: string, filename: string): Promise<void>
  deleteUserFolder(userId: string): Promise<void>
}