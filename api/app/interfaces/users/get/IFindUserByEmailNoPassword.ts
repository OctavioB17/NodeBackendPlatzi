import UserNoPasswordDTO from "../../../../infraestructure/dtos/users/UserNoPasswordDTO";

export interface IFindUserByEmailNoPassword {
  execute(email: string): Promise<UserNoPasswordDTO | null>
}
