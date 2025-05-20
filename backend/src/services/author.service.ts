import { CreateAuthorDTO, UpdateAuthorDTO } from "@/dtos/author.dto";
import { Author } from "@/generated/prisma";
import { IAuthorRepository } from "@/repositories/author/IAuthorRepository";

class AuthorService {
  constructor(private readonly authorRepository: IAuthorRepository) {}

  async createAuthor(authorDto: CreateAuthorDTO): Promise<Author> {
    return await this.authorRepository.create(authorDto);
  }

  async getAllAuthors(): Promise<Author[]> {
    const authors = await this.authorRepository.findAll();
    if (!authors || authors.length === 0) throw new Error("No authors found.");
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

    return updated;
  }

  async deleteAuthor(id: string): Promise<Author> {
    const existingAuthor = await this.authorRepository.findById(id);
    if (!existingAuthor)
      throw new Error(`Cannot delete. Author with ID: ${id} not found.`);

    const deleted = await this.authorRepository.delete(id);
    if (!deleted) throw new Error(`Failed to delete author with ID: ${id}.`);

    return deleted;
  }
}

export default AuthorService;
