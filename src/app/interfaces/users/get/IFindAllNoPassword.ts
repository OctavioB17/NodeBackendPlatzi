import UserNoPasswordDTO from "../../../../infraestructure/dtos/UserNoPasswordDTO";

export interface IFindAllNoPassword {
  execute(): Promise<UserNoPasswordDTO[] | null>
}
