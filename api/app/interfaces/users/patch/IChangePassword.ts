import User from "../../../../domain/entities/Users";

export interface IChangePassword {
  execute(password: string, email: string): Promise<User | null>
}
