import { product } from "../interfaces/products";
import { faker } from "@faker-js/faker"

let productArray: product[] = []

export function findProductById(id: number): product | null {
  const productFind = productArray.find(product => product.id === id)
  return productFind ? productFind : null
}

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
export function updateProduct(product: Partial<product>, id: number): product | null {
  if (id != null) {
    const productFind = findProductById(id)
    if (productFind) {
      productFind.productName = product.productName || productFind.productName;
      productFind.isbn = product.isbn || productFind.isbn;
      productFind.product = product.product || productFind.product;
      productFind.adjetive = product.adjetive || productFind.adjetive;
      productFind.department = product.department || productFind.department;
      productFind.description = product.description || productFind.description;
      productFind.price = product.price || productFind.price;
      productFind.material = product.material || productFind.material;
      return productFind;
    }
  }
  return null;
}

export function deleteProductById(id: number): product | null {
  const productIndex = productArray.findIndex(product => product.id === id)
  if (productIndex !== -1) {
    const [productPop] = productArray.splice(productIndex, 1)
    return productPop
  }
  return null
}
