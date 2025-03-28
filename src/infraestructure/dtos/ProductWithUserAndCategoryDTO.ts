import { Expose } from "class-transformer";
import UserNoPasswordDTO from "./UserNoPasswordDTO";
import CategoriesModel from "../database/models/CategoriesModel";
import CategoryDTO from "./CategoryDTO";

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
  dimensions!: { length: string; width: string; heigth: string; } | null;

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