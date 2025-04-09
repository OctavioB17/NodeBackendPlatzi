import UserNoPasswordDTO from "../../../../infraestructure/dtos/users/UserNoPasswordDTO";

export interface IFindUserByIdNoPassword {
  execute(id: string): Promise<UserNoPasswordDTO | null>
}
