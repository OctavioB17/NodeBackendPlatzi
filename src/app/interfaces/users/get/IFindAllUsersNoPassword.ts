import UserNoPasswordDTO from "../../../../infraestructure/dtos/UserNoPasswordDTO";

export interface IFindAllUsersNoPassword {
  execute(): Promise<UserNoPasswordDTO[] | null>
}
