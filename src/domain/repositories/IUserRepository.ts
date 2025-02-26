import { UserNoPasswordDTO } from "../../app/dtos/UserDTO";
import { IUser } from "../interfaces/user/IUser";

export interface IUserRepository {
  createUser(user: IUser): Promise<IUser>;
  findById(id: string): Promise<IUser | null>
  findByEmail(email: string): Promise<IUser | null>;
  findAll(): Promise<IUser[] | null>;
  findByIdNoPassword(id: string): Promise<UserNoPasswordDTO | null>
  findByEmailNoPassword(email: string): Promise<UserNoPasswordDTO | null>;
  findAllNoPassword(): Promise<UserNoPasswordDTO[] | null>
  changePassword(password: string, email: string): Promise<IUser | null>
  deleteUser(id: string): Promise<boolean>
}
