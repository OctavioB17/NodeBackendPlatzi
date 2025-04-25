export interface IProductModel {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string;
  sku: string | null;
  length: string,
  width: string,
  height: string
  weight: number | null;
  price: number;
  stock: number;
  categoryId: string;
  material: string[] | null;
  isPaused: boolean;
  userId: string;
}