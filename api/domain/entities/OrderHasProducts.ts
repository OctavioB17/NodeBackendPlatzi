export default class OrderHasProducts {
  private id: string;
  private orderId: string;
  private productId: string;
  private quantity: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    orderId: string,
    productId: string,
    quantity: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id,
    this.orderId = orderId,
    this.productId = productId,
    this.quantity = quantity,
    this.createdAt = createdAt,
    this.updatedAt = updatedAt
  }

    // Getters
    public getId(): string {
      return this.id;
    }

    public getOrderId(): string {
      return this.orderId;
    }

    public getProductId(): string {
      return this.productId;
    }

    public getQuantity(): number {
      return this.quantity;
    }

    public getCreatedAt(): Date {
      return this.createdAt;
    }

    public getUpdatedAt(): Date {
      return this.updatedAt;
    }

    // Setters
    public setId(id: string): void {
      this.id = id;
    }

    public setOrderId(orderId: string): void {
      this.orderId = orderId;
    }

    public setProductId(productId: string): void {
      this.productId = productId;
    }

    public setQuantity(quantity: number): void {
      this.quantity = quantity;
    }

    public setCreatedAt(createdAt: Date): void {
      this.createdAt = createdAt;
    }

    public setUpdatedAt(updatedAt: Date): void {
      this.updatedAt = updatedAt;
    }
}