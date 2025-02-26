import { IUser } from "../../../../domain/interfaces/user/IUser";

export interface IChangePassword {
  execute(password: string, email: string): Promise<IUser | null>
}
