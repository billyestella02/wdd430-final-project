export class Contact {
  public id: string;
  public name: string;
  public email: string;
  public country: string;
  public phone: string;
  public message: string;

  constructor(
    id: string,
    name: string,
    email: string,
    country: string,
    phone: string,
    message: string) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.country = country;
      this.phone = country;
      this.message = message;
  }
}
