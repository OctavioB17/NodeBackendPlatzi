import User from "../../../../domain/entities/Users";

export interface IFindAllUsers {
  execute(): Promise<User[] | null>
}
