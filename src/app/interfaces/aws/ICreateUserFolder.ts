export interface ICreateUserFolder {
  execute(userId: string): Promise<void>;
}