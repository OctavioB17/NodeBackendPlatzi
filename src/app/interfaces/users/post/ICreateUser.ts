import UserDTO from "../../../../infraestructure/dtos/UserDTO";

export interface ICreateUser {
  execute(userDTO: UserDTO): Promise<boolean>
}
