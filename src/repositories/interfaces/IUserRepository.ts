import { TypeUser } from "../../models/User";

export interface IUserRepository {
  findAll(): Promise<TypeUser[]>;
  create(data: Omit<TypeUser, "id">): Promise<TypeUser>;
  findById(id: number): Promise<TypeUser | null>;
}
