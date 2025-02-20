import { faker } from "@faker-js/faker"

export default function generateUsertList(numberOfUsers: number) {
  const productArray = []
  for (let index = 0; index < numberOfUsers; index++) {
    const product = {
      id: index + 1,
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      lastName: faker.person.lastName(),
      bio: faker.person.bio(),
      gender: faker.person.gender(),
      jobTitle: faker.person.jobTitle(),
      jobArea: faker.person.jobArea(),
    }
    productArray.push(product);
  }
  return productArray;
}
