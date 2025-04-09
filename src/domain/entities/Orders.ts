import { Taxes } from "../interfaces/orders/IOrders";
import { IOrdersEntity } from "../interfaces/orders/IOrdersEntity";

export default class Orders implements IOrdersEntity {

  private id: string;
  private userId: string;
  private status: string;
  private totalPrice: number;
  private paymentMethod: string;
  private taxes: Taxes[];

  constructor(
    id: string,
    userId: string,
    status: string,
    totalPrice: number,
    paymentMethod: string,
    taxes: Taxes[]
  ) {
   this.id = id
   this.userId = userId
   this.status = status
   this.totalPrice = totalPrice
   this.paymentMethod = paymentMethod
   this.taxes = taxes
  }

  getId(): string {
    return this.id
  }
  getUserId(): string {
    return this.userId
  }
  getTotalPrice(): number {
    return this.totalPrice
  }
  getStatus(): string {
    return this.status
  }
  getPaymentMethod(): string {
    return this.paymentMethod
  }
  getTaxes(): Taxes[] {
    return this.taxes
  }
  setId(id: string): void {
    this.id  = id;
  }
  setUserId(userId: string): void {
    this.userId = userId;
  }
  setTotalPrice(totalPrice: number): void {
    this.totalPrice = totalPrice;
  }
  setStatus(status: string): void {
    this.status  = status;
  }
  setPaymentMethod(paymentMethod: string): void {
    this.paymentMethod  = paymentMethod;
  }
  setTaxes(taxes: Taxes[]): void {
    this.taxes = taxes;
  }
}
