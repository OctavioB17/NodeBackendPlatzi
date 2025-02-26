import { IUser } from "../../../../domain/interfaces/user/IUser";

export interface IFindUserById {
  execute(id: string): Promise<IUser | null>
}
