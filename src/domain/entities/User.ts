export default class User {
  constructor(
    private id: string,
    private name: string,
    private surname: string,
    private password: string,
    private email: string
  ) {
    if (!id || !name || !surname || !password || !email) {
      throw new Error('All fields are required');
    }
    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email format');
    }
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
}
