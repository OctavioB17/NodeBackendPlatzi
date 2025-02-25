import { IUser } from "../interfaces/user/IUser";

export interface IUserRepository {
  createUser(user: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  changePassword(password: string, email: string): Promise<IUser | null>
  deleteUser(id: string): Promise<boolean>
}
