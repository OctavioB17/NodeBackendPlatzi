import Category from "../../../../domain/entities/Categories";
import { IPagination } from "../../../../domain/interfaces/IPagination";

export default interface IFindAllCategories {
  execute(limit: number, offset: number): Promise<IPagination<Category[]> | null>
}
