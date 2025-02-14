import { product } from "../interfaces/routes";
import { faker } from "@faker-js/faker"
export default function generateProductList(numberOfProducts: number): product[] {
  const productArray = []
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
