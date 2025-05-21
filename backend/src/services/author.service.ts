import { CreateAuthorDTO, UpdateAuthorDTO } from "@/dtos/author.dto";
import { Author } from "@/generated/prisma";
import { IAuthorRepository } from "@/repositories/author/IAuthorRepository";
import client from "@/config/redis";

class AuthorService {
  constructor(private readonly authorRepository: IAuthorRepository) {}

  async createAuthor(authorDto: CreateAuthorDTO): Promise<Author> {
    const author = await this.authorRepository.create(authorDto);
    await client.del("authors:all");
    return author;
  }

  async getAllAuthors(): Promise<Author[]> {
    const cacheKey = "authors:all";

    const cached = await client.get(cacheKey);
    if (cached) {
      console.log("Returned from Redis");
      return JSON.parse(cached);
    }

    const authors = await this.authorRepository.findAll();

    if (!authors || authors.length === 0) {
      await client.del(cacheKey);
      return [];
    }

    await client.set(cacheKey, JSON.stringify(authors), { EX: 60 });
    return authors;
  }

  async getAuthorById(id: string): Promise<Author> {
    const author = await this.authorRepository.findById(id);
    if (!author) throw new Error(`Author with ID: ${id} doesn't exist.`);
    return author;
  }

  async updateAuthor(id: string, updateDto: UpdateAuthorDTO): Promise<Author> {
    const existingAuthor = await this.authorRepository.findById(id);
    if (!existingAuthor)
      throw new Error(`Cannot update. Author with ID: ${id} not found.`);

    const updated = await this.authorRepository.update(id, updateDto);
    if (!updated) throw new Error(`Failed to update author with ID: ${id}.`);

    await client.del("authors:all");
    return updated;
  }

  async deleteAuthor(id: string): Promise<Author> {
    const existingAuthor = await this.authorRepository.findById(id);
    if (!existingAuthor)
      throw new Error(`Cannot delete. Author with ID: ${id} not found.`);

    const deleted = await this.authorRepository.delete(id);
    if (!deleted) throw new Error(`Failed to delete author with ID: ${id}.`);

    await client.del("authors:all");
    return deleted;
  }
}

export default AuthorService;
