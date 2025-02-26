import { IUser } from "../../../../domain/interfaces/user/IUser";

export interface IFindUserByEmail {
  execute(email: string): Promise<IUser | null>
}
