import { Taxes } from "../interfaces/orders/IOrders";
import { IOrdersEntity } from "../interfaces/orders/IOrdersEntity";
import Product from "./Products";
import User from "./Users";

export default class Orders implements IOrdersEntity {

  private id: string;
  private products: Product[];
  private user: User;
  private status: string;
  private totalPrice: number;
  private paymentMethod: string;
  private taxes: Taxes[];

  constructor(
    id: string,
    products: Product[],
    user: User,
    status: string,
    totalPrice: number,
    paymentMethod: string,
    taxes: Taxes[]
  ) {
   this.id = id
   this.products = products
   this.user = user
   this.status = status
   this.totalPrice = totalPrice
   this.paymentMethod = paymentMethod
   this.taxes = taxes
  }

  getId(): string {
    return this.id
  }
  getProducts(): Product[] {
    return this.products
  }
  getUser(): User {
    return this.user
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
  setproducts(products: Product[]): void {
    this.products  = products;
  }
  setUser(user: User): void {
    this.user = user;
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
