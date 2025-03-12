import Product from "../../entities/Product";

export interface ICategoriesEntity {
  getId(): number;
  getName(): string;
  getDescription(): string;
  getProducts(): Product[];
  setId(id: number): void;
  setName(name: string): void;
  setDescription(description: string): void;
  setProducts(products: Product[]): void;
}