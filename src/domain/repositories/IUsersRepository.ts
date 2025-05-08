import UserModel from "../../infraestructure/database/models/UserModel";
import User from "../entities/Users";
import { UserRolesEnum } from "../interfaces/user/UserRoles";

export interface IUserRepository {
  createUser(user: User): Promise<boolean>;
  findById(id: string): Promise<User | null>
  findByIdSystem(id: string): Promise<UserModel | null>
  findByEmail(email: string): Promise<User | null>;
  findAll(limit: number, offset: number): Promise<User[] | null>;
  changePassword(newPassword: string, userId: string): Promise<User | null>
  deleteUser(id: string): Promise<boolean>
  markUserAsAuthorized(id: string): Promise<User>,
  changeUserRole(id: string, role: keyof typeof UserRolesEnum): Promise<User>
  saveRefreshToken(userId: string, refreshToken: string): Promise<void>
  getRefreshToken(userId: string): Promise<string | null>
  removeRefreshToken(userId: string): Promise<void>
}
