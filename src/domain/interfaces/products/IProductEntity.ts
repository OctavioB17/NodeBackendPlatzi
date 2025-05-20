export interface IProductEntity {
  getId(): string;
  getName(): string;
  getDescription(): string | null;
  getImageGallery(): string[]
  getSku(): string | null;
  getWeight(): number | null;
  getPrice(): string;
  getStock(): number;
  getCategory(): string;
  getMaterial(): string[] | null;
  isProductPaused(): boolean;
  getUserId(): string;
  getLength(): string
  getWidth(): string
  getHeight(): string


  setName(name: string): void;
  setDescription(description: string | null): void;
  setImageGallery(imageGallery: string[]): void;
  setSku(sku: string | null): void;
  setWeight(weigth: number | null): void;
  setPrice(price: string): void;
  setStock(stock: number): void;
  setCategory(category: string): void;
  setMaterial(material: string[] | null): void;
  setPaused(isPaused: boolean): void;
  setLength(length: string): void
  setWidth(width: string): void
  setHeight(height: string): void
}