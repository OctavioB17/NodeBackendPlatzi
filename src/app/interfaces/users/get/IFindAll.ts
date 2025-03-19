import UserDTO from "../../../../infraestructure/dtos/UserDTO";

export interface IFindAllUsers {
  execute(): Promise<UserDTO[] | null>
}
