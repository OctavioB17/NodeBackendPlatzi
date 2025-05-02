export default interface IDeleteFolderInS3 {
  execute(folderName: string): Promise<void>;
}

