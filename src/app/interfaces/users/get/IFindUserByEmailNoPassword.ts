import UserNoPasswordDTO from "../../../../infraestructure/dtos/UserNoPasswordDTO";

export interface IFindUserByEmailNoPassword {
  execute(email: string): Promise<UserNoPasswordDTO | null>
}
