import OrderDTO from "../../../infraestructure/dtos/OrderDTO";
import OrderHasProductsDTO from "../../../infraestructure/dtos/OrderHasProductsDTO";

export interface IOrders {
  id: string;
  userId: string;
  status: string;
  totalPrice: number;
  paymentMethod: string;
  taxes: Taxes[]
}

export interface Taxes {
  type: string;
  number: number
}

export interface CreateOrderRequest {
  order: OrderDTO;
  orderHasProducts: OrderHasProductsDTO;
}