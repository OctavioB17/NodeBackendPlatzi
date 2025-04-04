import Product from "../../entities/Products";

export interface ICategories {
id: number;
name: string;
description: string;
products: Product[];

getId(): number;
getName(): string;
getDescription(): string;
getProducts(): Product[];
setId(id: number): void;
setName(name: string): void;
setDescription(description: string): void;
setProducts(products: Product[]): void;
}
