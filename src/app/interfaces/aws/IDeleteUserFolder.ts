export interface IDeleteUserFolder {
  execute(userId: string): Promise<void>;
}
