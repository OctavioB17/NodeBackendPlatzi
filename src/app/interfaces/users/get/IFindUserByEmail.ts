import UserDTO from "../../../../infraestructure/dtos/UserDTO";

export interface IFindUserByEmail {
  execute(email: string): Promise<UserDTO | null>
}
