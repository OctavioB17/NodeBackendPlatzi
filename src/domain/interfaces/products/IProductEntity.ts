export interface IProductEntity {
  getId(): string;
  getName(): string;
  getDescription(): string | null;
  getImageUrl(): string;
  getSku(): string | null;
  getDimensions(): {length: string, width: string, heigth: string} | null;
  getWeigth(): number | null;
  getPrice(): string;
  getStock(): number;
  getCategory(): string;
  getMaterial(): string[] | null;
  isProductPaused(): boolean;
  getUserId(): string;

  setName(name: string): void;
  setDescription(description: string | null): void;
  setImageUrl(imageUrl: string): void;
  setSku(sku: string | null): void;
  setDimensions(dimensions: {length: string, width: string, heigth: string} | null): void;
  setWeigth(weigth: number | null): void;
  setPrice(price: string): void;
  setStock(stock: number): void;
  setCategory(category: string): void;
  setMaterial(material: string[] | null): void;
  setPaused(isPaused: boolean): void;
}