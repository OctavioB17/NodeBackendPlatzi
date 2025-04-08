import Product from "../../entities/Products";

export interface ICategoriesEntity {
  getId(): string;
  getName(): string;
  getDescription(): string;
  setId(id: string): void;
  setName(name: string): void;
  setDescription(description: string): void;
}
