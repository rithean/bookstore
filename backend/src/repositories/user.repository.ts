import { db } from "@/config/db";
import { UpdateUserDTO } from "@/dtos/user.dto";
import { User } from "@prisma/client";

class UserRepository {
  async getAll(): Promise<User[]> {
    return await db.user.findMany();
  }

  async getById(id: string): Promise<User | null> {
    return await db.user.findUnique({
      where: { id },
    });
  }

  async getByEmail(email: string): Promise<User | null> {
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
