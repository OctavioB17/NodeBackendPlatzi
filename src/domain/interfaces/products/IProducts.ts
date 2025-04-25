export interface IProduct {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string;
  sku: string | null;
  length: string;
  width: string;
  height: string;
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
  getWeight(): number | null;
  getPrice(): string;
  getStock(): number;
  getCategoryId(): string;
  getMaterial(): string[] | null;
  isProductPaused(): boolean;
  getUserId(): string;
  getLength(): string
  getWidth(): string
  getHeight(): string

  setName(name: string): void;
  setDescription(description: string | null): void;
  setImageUrl(imageUrl: string): void;
  setSku(sku: string | null): void;
  setWeight(weigth: number | null): void;
  setPrice(price: string): void;
  setStock(stock: number): void;
  setCategory(category: string[]): void;
  setMaterial(material: string[] | null): void;
  setPaused(isPaused: boolean): void;
  setLength(length: string): void
  setWidth(width: string): void
  setHeight(height: string): void
}