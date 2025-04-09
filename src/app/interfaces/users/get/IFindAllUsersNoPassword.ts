import UserNoPasswordDTO from "../../../../infraestructure/dtos/users/UserNoPasswordDTO";

export interface IFindAllUsersNoPassword {
  execute(): Promise<UserNoPasswordDTO[] | null>
}
