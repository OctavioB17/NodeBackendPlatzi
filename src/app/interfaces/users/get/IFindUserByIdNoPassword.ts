import UserNoPasswordDTO from "../../../../infraestructure/dtos/UserNoPasswordDTO";

export interface IFindUserByIdNoPassword {
  execute(id: string): Promise<UserNoPasswordDTO | null>
}
