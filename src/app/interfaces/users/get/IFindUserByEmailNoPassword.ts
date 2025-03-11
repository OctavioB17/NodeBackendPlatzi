import { UserNoPasswordDTO } from "../dto/UserDTOInterface";

export interface IFindUserByEmailNoPassword {
  execute(email: string): Promise<UserNoPasswordDTO | null>
}
