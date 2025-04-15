export interface IProduct {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string;
  sku: string | null;
  dimensions: {length: string, width: string, heigth: string} | null;
  weight: number | null;
  price: string;
  stock: number;
  categoryId: string;
  material: string[] | null;
  isPaused: boolean;
  userId: string;

  getId(): string;
  getName(): string;
  getDescription(): string | null;
  getImageUrl(): string;
  getSku(): string | null;
  getDimensions(): {length: string, width: string, heigth: string} | null;
  getWeight(): number | null;
  getPrice(): string;
  getStock(): number;
  getCategoryId(): string;
  getMaterial(): string[] | null;
  isProductPaused(): boolean;
  getUserId(): string;

  setName(name: string): void;
  setDescription(description: string | null): void;
  setImageUrl(imageUrl: string): void;
  setSku(sku: string | null): void;
  setDimensions(dimensions: {length: string, width: string, heigth: string} | null): void;
  setWeight(weigth: number | null): void;
  setPrice(price: string): void;
  setStock(stock: number): void;
  setCategory(category: string[]): void;
  setMaterial(material: string[] | null): void;
  setPaused(isPaused: boolean): void;
}