import User from "../../../../domain/entities/Users";

export interface IFindUserById {
  execute(id: string): Promise<User | null>
}
