import UserDTO from "../../../../infraestructure/dtos/UserDTO";

export interface IChangePassword {
  execute(password: string, email: string): Promise<UserDTO | null>
}
