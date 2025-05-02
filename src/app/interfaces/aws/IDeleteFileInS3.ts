export default interface IDeleteFile {
  execute(fileKey: string): Promise<void>;
}