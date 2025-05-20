import { db } from "@/config/db";
import { CreateAuthorDTO, UpdateAuthorDTO } from "@/dtos/author.dto";
import { Author } from "@/generated/prisma";
import { IAuthorRepository } from "./IAuthorRepository";

class AuthorRepository implements IAuthorRepository {
  async create(authorDto: CreateAuthorDTO): Promise<Author> {
    return await db.author.create({ data: authorDto });
  }

  async findAll(): Promise<Author[]> {
    return await db.author.findMany();
  }

  async findById(id: string): Promise<Author | null> {
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
