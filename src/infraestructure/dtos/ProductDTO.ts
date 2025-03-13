import { Expose } from "class-transformer";

export default class ProductDTO {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  description!: string | null;

  @Expose()
  imageUrl!: string;

  @Expose()
  sku!: string | null;

  @Expose()
  dimensions!: { length: string; width: string; heigth: string; } | null;

  @Expose()
  weigth!: number | null;

  @Expose()
  price!: number;

  @Expose()
  stock!: number;

  @Expose()
  categoryId!: string;

  @Expose()
  material!: string[] | null;

  @Expose()
  isPaused!: boolean;

  @Expose()
  userId!: string;
}