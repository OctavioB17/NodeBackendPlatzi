export default interface IDeleteFile {
  execute(userId: string, fileName: string): Promise<void>;
}