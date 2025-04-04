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
