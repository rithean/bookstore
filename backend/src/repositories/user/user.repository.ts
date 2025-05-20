import { db } from "@/config/db";
import { UpdateUserDTO } from "@/dtos/user.dto";
import { User } from "@/generated/prisma";
import { IUserRepository } from "./IUserRepository";

class UserRepository implements IUserRepository {
  async findAll(): Promise<User[]> {
    return await db.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return await db.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await db.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updatedData: UpdateUserDTO): Promise<User> {
    return await db.user.update({
      where: { id },
      data: updatedData,
    });
  }

  async delete(id: string): Promise<User> {
    return await db.user.delete({
      where: { id },
    });
  }
}

export default UserRepository;
