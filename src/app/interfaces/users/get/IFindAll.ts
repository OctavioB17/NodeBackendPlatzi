import { IUser } from "../../../../domain/interfaces/user/IUser";

export interface IFindAll {
  execute(): Promise<IUser[] | null>
}
