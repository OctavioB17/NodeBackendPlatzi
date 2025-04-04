import User from "../../../../domain/entities/Users";
import UserDTO from "../../../../infraestructure/dtos/UserDTO";

export interface ICreateUser {
  execute(user: UserDTO): Promise<boolean>
}
