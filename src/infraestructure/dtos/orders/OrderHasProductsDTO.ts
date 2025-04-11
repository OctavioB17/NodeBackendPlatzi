import { Expose } from "class-transformer";

export default class OrderHasProductsDTO {
  @Expose()
  id!: string;

  @Expose()
  productId!: string;

  @Expose()
  orderId!: string;

  @Expose()
  quantity!: number;

  @Expose()
  createdAt?: Date

  @Expose()
  updatedAt?: Date
}