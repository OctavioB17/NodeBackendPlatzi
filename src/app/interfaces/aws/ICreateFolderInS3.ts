export default interface ICreateFolderInS3 {
  execute(folderName: string): Promise<void>;
}
