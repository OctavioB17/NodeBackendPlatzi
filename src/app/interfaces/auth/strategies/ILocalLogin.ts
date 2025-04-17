import User from "../../../../domain/entities/Users";

export default interface ILocalLogin {
  login(email: string, password: string): Promise<User>;
}