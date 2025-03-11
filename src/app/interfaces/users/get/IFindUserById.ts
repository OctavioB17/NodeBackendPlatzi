import { IUser } from "../../../../domain/interfaces/user/IUser";
import UserDTO from "../../../../infraestructure/dtos/UserDTO";

export interface IFindUserById {
  execute(id: string): Promise<UserDTO | null>
}
