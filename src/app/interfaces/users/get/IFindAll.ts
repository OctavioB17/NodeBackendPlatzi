import UserDTO from "../../../../infraestructure/dtos/UserDTO";

export interface IFindAll {
  execute(): Promise<UserDTO[] | null>
}
