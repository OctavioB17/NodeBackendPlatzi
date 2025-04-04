import Product from "../../entities/Products";
import User from "../../entities/Users";
import { Taxes } from "./IOrders";

export interface IOrdersEntity {
  getId(): string;
  getProducts(): Product[];
  getUser(): User;
  getTotalPrice(): number;
  getStatus(): string;
  getPaymentMethod(): string;
  getTaxes(): Taxes[]

  setId(id: string): void;
  setproducts(products: Product[]): void;
  setUser(user: User): void;
  setTotalPrice(totalPrice: number): void;
  setStatus(status: string): void;
  setPaymentMethod(paymentMethod: string): void;
  setTaxes(taxes: Taxes[]): void;
}
