import { randomUUID, UUID } from "crypto";
import { TypeUser } from "../types/users";

export class UserController {
  private users: TypeUser[] = [];

  public getUsers() {
    return this.users;
  }

  public createUser(data: { name: string; email: string }) {
    const { name, email } = data;
    const newUser = { id: randomUUID(), name, email };
    this.users.push(newUser);
    return newUser;
  }
}
