import { UserNoPasswordDTO } from "../../../dtos/UserDTO";

export interface IFindUserByEmailNoPassword {
  execute(email: string): Promise<UserNoPasswordDTO | null>
}
