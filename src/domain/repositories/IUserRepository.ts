import UserModel from "../../infraestructure/database/models/UserModel";
import { IUser } from "../interfaces/user/IUser";

export interface IUserRepository {
  createUser(user: IUser): Promise<boolean>;
  findById(id: string): Promise<UserModel | null>
  findByEmail(email: string): Promise<UserModel | null>;
  findAll(): Promise<UserModel[] | null>;
  changePassword(password: string, email: string): Promise<UserModel | null>
  deleteUser(id: string): Promise<boolean>
}
