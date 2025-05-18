import { db } from "@/config/db";
import { CreateAuthorDTO, UpdateAuthorDTO } from "@/dtos/author.dto";
import { Author } from "@/generated/prisma";

class AuthorRepository {
  async create(authorDto: CreateAuthorDTO): Promise<Author> {
    return await db.author.create({ data: authorDto });
  }

  async getAll(): Promise<Author[]> {
    return await db.author.findMany();
  }

  async getById(id: string): Promise<Author | null> {
    return await db.author.findUnique({ where: { id } });
  }

  async update(id: string, updateDto: UpdateAuthorDTO): Promise<Author> {
    return await db.author.update({ where: { id }, data: updateDto });
  }

  async delete(id: string): Promise<Author> {
    return await db.author.delete({ where: { id } });
  }
}

export default AuthorRepository;
