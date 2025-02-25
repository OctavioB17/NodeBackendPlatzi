import { IUser } from "../../../domain/interfaces/user/IUser";
import { UserDTO } from "../../dtos/UserDTO";

export interface ICreateUser {
  execute(userDTO: UserDTO): Promise<IUser>
}
