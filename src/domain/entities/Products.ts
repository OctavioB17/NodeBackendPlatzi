import { IProductEntity } from "../interfaces/products/IProductEntity";

export default class Product implements IProductEntity {
    private id: string;
    private name: string;
    private description: string | null;
    private imageUrl: string;
    private sku: string | null;
    private length: string;
    private width: string;
    private height: string;
    private weigth: number | null;
    private price: string;
    private stock: number;
    private categoryId: string;
    private material: string[] | null;
    private isPaused: boolean;
    private userId: string;

    constructor(
      id: string,
      name: string,
      description: string | null,
      imageUrl: string,
      sku: string | null,
      length: string,
      width: string,
      height: string,
      weigth: number | null,
      price: string,
      stock: number,
      categoryId: string,
      material: string[] | null,
      isPaused: boolean,
      userId: string
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.imageUrl = imageUrl;
      this.sku = sku;
      this.length = length;
      this.width = width;
      this.height = height;
      this.weigth = weigth;
      this.price = price;
      this.stock = stock;
      this.categoryId = categoryId;
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

      public getWeigth(): number | null {
          return this.weigth;
      }

      public getPrice(): string {
          return this.price;
      }

      public getStock(): number {
          return this.stock;
      }

      public getCategory(): string {
          return this.categoryId;
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

      public getLength(): string {
        return this.length
      }

      public getWidth(): string {
        return this.width
      }

      public getHeight(): string {
        return this.height
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

      public setWeigth(weigth: number | null): void {
          this.weigth = weigth;
      }

      public setPrice(price: string): void {
          this.price = price;
      }

      public setStock(stock: number): void {
          this.stock = stock;
      }

      public setCategory(category: string): void {
          this.categoryId = category;
      }

      public setMaterial(material: string[] | null): void {
          this.material = material;
      }

      public setPaused(isPaused: boolean): void {
          this.isPaused = isPaused;
      }

      public setLength(length: string): void {
        this.length = length;
      }

      public setWidth(width: string): void {
        this.width = width;
      }

      public setHeight(height: string): void {
        this.height = height;
      }
}
