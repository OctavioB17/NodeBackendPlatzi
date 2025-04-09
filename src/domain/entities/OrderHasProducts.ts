export default class OrderHasProducts {
  private id: string;
  private orderId: string;
  private productId: string;
  private quantity: number;

  constructor(
    id: string,
    orderId: string,
    productId: string,
    quantity: number
  ) {
    this.id = id,
    this.orderId = orderId,
    this.productId = productId,
    this.quantity = quantity
  }
}