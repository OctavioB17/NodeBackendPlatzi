export interface IProductModel {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string;
  sku: string | null;
  dimensions: {length: string, width: string, heigth: string} | null;
  weight: number | null;
  price: number;
  stock: number;
  categoryId: string;
  material: string[] | null;
  isPaused: boolean;
  userId: string;
}