import { UserRepository } from "../repositories/UserRepository";
import { TypeUser } from "../models/User";

export class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async getUsers(): Promise<TypeUser[]> {
    return this.userRepository.findAll();
  }

  public async getUserById(id: number): Promise<TypeUser | null> {
    return this.userRepository.findById(id);
  }

  public async createUser(data: Omit<TypeUser, "id">): Promise<TypeUser> {
    return this.userRepository.create(data);
  }

  public async updateUser(
    id: number,
    data: Partial<TypeUser>
  ): Promise<TypeUser | null> {
    try {
      return await this.userRepository.update(id, data);
    } catch (error: any) {
      if (error.code === "P2025") {
        return null;
      }
      throw error;
    }
  }

  public async deleteUser(id: number): Promise<TypeUser | null> {
    try {
      return await this.userRepository.delete(id);
    } catch (error: any) {
      if (error.code === "P2025") {
        return null;
      }
      throw error;
    }
  }
}
