import { UserNoPasswordDTO } from "../../../dtos/UserDTO";

export interface IFindAllNoPassword {
  execute(): Promise<UserNoPasswordDTO[] | null>
}
