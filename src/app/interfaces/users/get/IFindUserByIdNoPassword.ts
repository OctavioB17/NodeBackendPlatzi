import { UserNoPasswordDTO } from "../dto/UserDTOInterface";

export interface IFindUserByIdNoPassword {
  execute(id: string): Promise<UserNoPasswordDTO | null>
}
