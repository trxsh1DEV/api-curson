// src/repositories/UserRepository.ts
import prisma from "../config/prisma";
import { TypeUser } from "../models/User";
import { IUserRepository } from "./interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
  public async findAll(): Promise<TypeUser[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  public async create(data: Omit<TypeUser, "id">): Promise<TypeUser> {
    const {
      name,
      email,
      firstName,
      lastName,
      country,
      street,
      city,
      state,
      zip,
    } = data;
    const user = await prisma.user.create({
      data: {
        email,
        name,
        firstName,
        lastName,
        country,
        street,
        city,
        state,
        zip,
      },
    });
    return user;
  }

  public async findById(id: number): Promise<TypeUser | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  public async update(
    id: number,
    data: Partial<TypeUser>
  ): Promise<TypeUser | null> {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return user;
  }

  public async delete(id: number): Promise<TypeUser | null> {
    const user = await prisma.user.delete({
      where: { id },
    });
    return user;
  }
}
