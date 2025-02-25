
export default class User {
  private id: string;
  private name: string;
  private surname: string;
  private password: string;
  private email: string;

  constructor(
    id: string,
    name: string,
    surname: string,
    password: string,
    email: string
  ) {
    if (!id || !name || !surname || !password || !email) {
      throw new Error('All fields are required');
    }
    this.id = id;
    this.name = name,
    this.surname = surname,
    this.password = password,
    this.email = email
  }

  getId(): string {
    try {
      return this.id
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  getName(): string {
    try {
      return this.name
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  getSurname(): string {
    try {
      return this.surname
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  getPassword(): string {
    try {
      return this.password
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  getEmail(): string {
    try {
      return this.email
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  setId(newId: string): void {
    try {
      if (!newId) throw new Error('Id must not be empty')
      this.id = newId
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  setName(newName: string): void {
    try {
      if (!newName) throw new Error('Name must not be empty')
      this.name = newName
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  setSurname(newSurname: string): void {
    try {
      if (!newSurname) throw new Error('Surname must not be empty')
      this.surname = newSurname
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  setPassword(newPassword: string): void {
    try {
      if (!newPassword) throw new Error('Password must not be empty')
      this.password = newPassword
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  setEmail(newEmail: string): void {
    try {
      if (!newEmail) throw new Error('Email must not be empty')
      this.email = newEmail
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
}
