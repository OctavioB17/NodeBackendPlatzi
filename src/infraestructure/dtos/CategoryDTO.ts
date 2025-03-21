import { Expose } from "class-transformer";

export default class CategoryDTO {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  description!: string | null;
}