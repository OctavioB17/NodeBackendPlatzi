export default class OrderHasProducts {
  private id: number;
  private orderId: string;
  private productId: string;
  private quantity: number;

  constructor(
    id: number,
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