import { Expose } from "class-transformer";
import { Taxes } from "../../domain/interfaces/orders/IOrders";

export default class OrderDTO {
  @Expose()
  id!: string;

  @Expose()
  userId!: string;

  @Expose()
  status!: string;

  @Expose()
  totalPrice!: number;

  @Expose()
  paymentMethod!: string;

  @Expose()
  taxes!: Taxes[]
}