import User from "../../../../domain/entities/Users";
import UserDTO from "../../../../infraestructure/dtos/users/UserDTO";

export interface ICreateUser {
  execute(user: UserDTO): Promise<boolean>
}
