import { ICategoriesEntity } from "../interfaces/categories/ICategoriesEntity";

export default class Category implements ICategoriesEntity {
  private id: string;
  private name: string;
  private description: string;
  private imageUrl: string;

  constructor(id: string, name: string, description: string, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
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
  
  getImageUrl(): string {
    return this.imageUrl;
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

  setImageUrl(imageUrl: string): void {
    this.imageUrl = imageUrl;
  }

}
