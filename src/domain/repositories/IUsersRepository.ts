import User from "../entities/Users";

export interface IUserRepository {
  createUser(user: User): Promise<boolean>;
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[] | null>;
  changePassword(password: string, email: string): Promise<User | null>
  deleteUser(id: string): Promise<boolean>
}
