import { UserNoPasswordDTO } from "../dto/UserDTOInterface";

export interface IFindAllNoPassword {
  execute(): Promise<UserNoPasswordDTO[] | null>
}
