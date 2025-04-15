import User from "../../../../domain/entities/Users";
import UserDTO from "../../../../infraestructure/dtos/users/UserDTO";

export interface IFindUserByEmail {
  execute(email: string): Promise<User | null>
}
