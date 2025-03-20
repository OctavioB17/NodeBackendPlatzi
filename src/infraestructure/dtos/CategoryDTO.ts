import { Expose } from "class-transformer";

export default class ProductDTO {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  description!: string | null;
}