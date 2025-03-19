import UserModel from "../../infraestructure/database/models/UserModel";
import UserDTO from "../../infraestructure/dtos/UserDTO";
import { IUser } from "../interfaces/user/IUser";

export interface IUserRepository {
  createUser(user: IUser): Promise<boolean>;
  findById(id: string): Promise<UserDTO | null>
  findByEmail(email: string): Promise<UserDTO | null>;
  findAll(): Promise<UserDTO[] | null>;
  changePassword(password: string, email: string): Promise<UserDTO | null>
  deleteUser(id: string): Promise<boolean>
}
