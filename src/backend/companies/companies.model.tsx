export default class Companies {
  email: string;
  description: string;
  id: string;
  name: string;

  constructor(email: string, description: string, id: string, name: string) {
    this.email = email;
    this.description = description;
    this.id = id;
    this.name = name;
  }
}
