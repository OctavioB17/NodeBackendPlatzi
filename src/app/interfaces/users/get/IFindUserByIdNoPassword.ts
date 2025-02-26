import { UserNoPasswordDTO } from "../../../dtos/UserDTO";

export interface IFindUserByIdNoPassword {
  execute(id: string): Promise<UserNoPasswordDTO | null>
}
