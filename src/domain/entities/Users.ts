export default class User {
  private id: string;
  private name: string;
  private surname: string;
  private password: string;
  private email: string;
  private role: string;

  constructor(
    id: string,
    name: string,
    surname: string,
    password: string,
    email: string,
    role: string
  ) {
    if (!id || !name || !surname || !password || !email || !role) {
      throw new Error('All fields are required');
    }
    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email format');
    }

    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  getEmail(): string {
    return this.email;
  }

  getId(): string {
    return this.id;
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
}
