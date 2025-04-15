import { IPagination } from "../../../../domain/interfaces/IPagination";
import UserNoPasswordDTO from "../../../../infraestructure/dtos/users/UserNoPasswordDTO";

export interface IFindAllUsersNoPassword {
  execute(limit: number, offset: number): Promise<IPagination<UserNoPasswordDTO[]> | null>
}
