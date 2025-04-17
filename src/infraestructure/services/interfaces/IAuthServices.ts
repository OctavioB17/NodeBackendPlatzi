import UserDTO from "../../dtos/users/UserDTO";

export default interface IAuthServices {
  login(email: string, password: string): Promise<any>;
  register(userData: UserDTO): Promise<UserDTO>;
}