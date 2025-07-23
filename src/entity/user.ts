export class User {
  constructor(
    private readonly name: string,
    private readonly email: string,
  ) {
    this.name = name;
    this.email = email;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }
}
