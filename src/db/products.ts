import { product } from "../interfaces/products";
import { faker } from "@faker-js/faker"

let productArray: product[] = []

export function generateProductList(numberOfProducts: number): product[] {
  for (let index = 0; index < numberOfProducts; index++) {
    const product: product = {
      id: index + 1,
      product: faker.commerce.product(),
      productName: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      department: faker.commerce.department(),
      isbn: faker.commerce.isbn(),
      adjetive: faker.commerce.productAdjective(),
      description: faker.commerce.productDescription(),
      material: faker.commerce.productMaterial()
    }
    productArray.push(product);
  }
  return productArray;
}

export function createProduct(productName: string, id: number, isbn: string, product: string, adjetive: string, departament: string, price: number, material: string, description: string): product {
  const newProduct: product = {
    productName: productName,
    id: id,
    isbn: isbn,
    product: product,
    adjetive: adjetive,
    department: departament,
    description: description,
    price: price,
    material: material
  }
  productArray.push(newProduct)
  return newProduct
}
