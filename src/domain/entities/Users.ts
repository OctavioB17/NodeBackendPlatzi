export default class User {
  private id: string;
  private name: string;
  private surname: string;
  private password: string;
  private authorized: boolean;
  private createdAt: Date
  private updatedAt: Date
  private email: string;
  private role: string;
  private refreshToken: string

  constructor(
    id: string,
    name: string,
    surname: string,
    password: string,
    email: string,
    authorized: boolean,
    role: string,
    createdAt: Date,
    updatedAt: Date,
    refreshToken: string
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.role = role;
    this.authorized = authorized;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.refreshToken = refreshToken;
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

  getAuthorized(): boolean {
    return this.authorized
  }

  getRefreshToken(): string {
    return this.refreshToken
  }

  setAuthorized(authorized: boolean): void {
    this.authorized = authorized
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

  setRefreshToken(refreshToken: string): void {
    this.refreshToken = refreshToken
  }
}
