import User from "../../../../domain/entities/Users";

export interface IChangePassword {
  execute(newPassword: string, token: string, userId: string): Promise<User | null>
}
