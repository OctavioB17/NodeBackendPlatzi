import User from "../../../../domain/entities/Users";
import { IPagination } from "../../../../domain/interfaces/IPagination";

export interface IFindAllUsers {
  execute(limit: number, offset: number): Promise<IPagination<User[]> | null>
}
