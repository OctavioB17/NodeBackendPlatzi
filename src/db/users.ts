import { faker } from "@faker-js/faker"
import { user } from "../interfaces/users";

let users: user[] = []

export function generateUsertList(numberOfUsers: number) {
  const users = []
  for (let index = 0; index < numberOfUsers; index++) {
    const User = {
      id: index + 1,
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      lastName: faker.person.lastName(),
      bio: faker.person.bio(),
      gender: faker.person.gender(),
      jobTitle: faker.person.jobTitle(),
      jobArea: faker.person.jobArea(),
    }
    users.push(User);
  }
  return users;
}

export function findUserById(id: number): user | null {
  const userFind = users.find(user => user.id === id)
  return userFind ? userFind : null
}


export function createUser(user: user): user {
  users.push(user)
  return user
}

export function updateUser(User: Partial<user>, id: number): user | null {
  if (id != null) {
    const UserFind = findUserById(id)
    if (UserFind) {
      UserFind.firstName = User.firstName || UserFind.firstName;
      UserFind.bio = UserFind.bio || UserFind.bio;
      UserFind.gender = UserFind.gender || UserFind.gender;
      UserFind.jobArea = UserFind.jobArea || UserFind.jobArea;
      UserFind.jobTitle = UserFind.jobTitle || UserFind.jobTitle;
      UserFind.lastName = UserFind.lastName || UserFind.lastName;
      UserFind.middleName = UserFind.middleName || UserFind.middleName;
      return UserFind;
    }
  }
  return null;
}

export function deleteUserById(id: number): user | null {
  const userIndex = users.findIndex(User => User.id === id)
  if (userIndex !== -1) {
    const [userPop] = users.splice(userIndex, 1)
    return userPop
  }
  return null
}
