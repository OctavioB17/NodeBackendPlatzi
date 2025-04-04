import Product from "../../entities/Products";
import User from "../../entities/Users";

export interface IOrders {
  id: string;
  products: Product[];
  user: User;
  status: string;
  totalPrice: number;
  paymentMethod: string;
  taxes: Taxes[]
}

export interface Taxes {
  type: string;
  number: number
}
