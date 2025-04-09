import { Taxes } from "./IOrders";

export interface IOrdersEntity {
  getId(): string;
  getUserId(): string;
  getTotalPrice(): number;
  getStatus(): string;
  getPaymentMethod(): string;
  getTaxes(): Taxes[]

  setId(id: string): void;
  setUserId(userId: string): void;
  setTotalPrice(totalPrice: number): void;
  setStatus(status: string): void;
  setPaymentMethod(paymentMethod: string): void;
  setTaxes(taxes: Taxes[]): void;
}
