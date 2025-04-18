export default class User {
  private id: string;
  private name: string;
  private surname: string;
  private password: string;
  private createdAt: Date
  private updatedAt: Date
  private email: string;
  private role: string;

  constructor(
    id: string,
    name: string,
    surname: string,
    password: string,
    email: string,
    role: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt,
    this.updatedAt = updatedAt
  }

  getEmail(): string {
    return this.email;
  }

  getId(): string {
    return this.id;
  }

  getPassword(): string {
    return this.password;
  }

  getName(): string {
    return this.name;
  }

  getSurname(): string {
    return this.surname;
  }

  getRole(): string {
    return this.role
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setId(id: string): void {
    this.id = id;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  setName(name: string): void {
    this.name = name;
  }

  setSurname(surname: string): void {
    this.surname = surname;
  }

  setRole(role: string): void {
    this.role = role;
  }

  setCreatedAt(date: Date): void {
    this.createdAt = date;
  }

  setUpdatedAt(date: Date): void {
    this.updatedAt = date;
  }
}
