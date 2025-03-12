import Product from "./Product";

export default class Category {
  private id: string;
  private name: string;
  private description: string;
  private products: Product[]

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.products = [];
  }

  // Getters

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  // Setters

  setName(name: string): void {
    this.name = name;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  getProducts(): Product[] {
    return this.products;
  }

  setProducts(products: Product[]): void {
    this.products = products;
  }
}