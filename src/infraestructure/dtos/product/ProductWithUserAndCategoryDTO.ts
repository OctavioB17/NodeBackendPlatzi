import { Expose } from "class-transformer";
import CategoryDTO from "../category/CategoryDTO";
import UserNoPasswordDTO from "../users/UserNoPasswordDTO";

export default class ProductWithUserAndCategoryDTO {
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

  @Expose()
  users!: UserNoPasswordDTO;

  @Expose()
  categories!: CategoryDTO
}
