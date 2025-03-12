import { IProductEntity } from "../interfaces/products/IProductEntity";

export default class Product implements IProductEntity {
    private id: string;
    private name: string;
    private description: string | null;
    private imageUrl: string;
    private sku: string | null;
    private dimensions: {length: string, width: string, heigth: string} | null;
    private weigth: number | null;
    private price: string;
    private stock: number;
    private category: string[];
    private material: string[] | null;
    private isPaused: boolean;
    private userId: string;

    constructor(
      id: string,
      name: string,
      description: string | null,
      imageUrl: string,
      sku: string | null,
      dimensions: {length: string, width: string, heigth: string} | null,
      weigth: number | null,
      price: string,
      stock: number,
      category: string[],
      material: string[] | null,
      isPaused: boolean,
      userId: string
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.imageUrl = imageUrl;
      this.sku = sku;
      this.dimensions = dimensions;
      this.weigth = weigth;
      this.price = price;
      this.stock = stock;
      this.category = category;
      this.material = material;
      this.isPaused = isPaused;
      this.userId = userId
    }

        // Getters
        public getId(): string {
          return this.id;
      }

      public getName(): string {
          return this.name;
      }

      public getDescription(): string | null {
          return this.description;
      }

      public getImageUrl(): string {
          return this.imageUrl;
      }

      public getSku(): string | null {
          return this.sku;
      }

      public getDimensions(): {length: string, width: string, heigth: string} | null {
          return this.dimensions;
      }

      public getWeigth(): number | null {
          return this.weigth;
      }

      public getPrice(): string {
          return this.price;
      }

      public getStock(): number {
          return this.stock;
      }

      public getCategory(): string[] {
          return this.category;
      }

      public getMaterial(): string[] | null {
          return this.material;
      }

      public isProductPaused(): boolean {
          return this.isPaused;
      }

      public getUserId(): string {
        return this.userId;
      }

      // Setters
      public setName(name: string): void {
          this.name = name;
      }

      public setDescription(description: string | null): void {
          this.description = description;
      }

      public setImageUrl(imageUrl: string): void {
          this.imageUrl = imageUrl;
      }

      public setSku(sku: string | null): void {
          this.sku = sku;
      }

      public setDimensions(dimensions: {length: string, width: string, heigth: string} | null): void {
          this.dimensions = dimensions;
      }

      public setWeigth(weigth: number | null): void {
          this.weigth = weigth;
      }

      public setPrice(price: string): void {
          this.price = price;
      }

      public setStock(stock: number): void {
          this.stock = stock;
      }

      public setCategory(category: string[]): void {
          this.category = category;
      }

      public setMaterial(material: string[] | null): void {
          this.material = material;
      }

      public setPaused(isPaused: boolean): void {
          this.isPaused = isPaused;
      }
}
