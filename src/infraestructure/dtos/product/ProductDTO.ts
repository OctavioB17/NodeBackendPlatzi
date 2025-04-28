import { Expose } from "class-transformer";

export default class ProductDTO {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  description!: string | null;

  @Expose()
  thumbnailUrl!: string;

  @Expose()
  imageGallery!: string[]

  @Expose()
  sku!: string | null;

  @Expose()
  length!: string;

  @Expose()
  width!: string;

  @Expose()
  height!: string;

  @Expose()
  weight!: number | null;

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