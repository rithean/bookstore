import { CreateAuthorDTO, UpdateAuthorDTO } from "@/dtos/author.dto";
import { Author } from "@/generated/prisma";
import AuthorRepository from "@/repositories/author.repository";

class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async createAuthor(authorDto: CreateAuthorDTO): Promise<Author> {
    return await this.authorRepository.create(authorDto);
  }

  async getAllAuthors(): Promise<Author[]> {
    const authors = await this.authorRepository.getAll();
    if (!authors || authors.length === 0) throw new Error("No author found.");
    return authors;
  }

  async getAuthorById(id: string): Promise<Author> {
    const author = await this.authorRepository.getById(id);
    if (!author) throw new Error(`Author with ID: ${id} doesn't exist.`);
    return author;
  }

  async updateAuthor(id: string, updateDto: UpdateAuthorDTO): Promise<Author> {
    const existingAuthor = await this.authorRepository.getById(id);
    if (!existingAuthor)
      throw new Error(`Cannot update. Author with ID: ${id} not found.`);
    return await this.authorRepository.update(id, updateDto);
  }

  async deleteAuthor(id: string): Promise<Author> {
    const existingAuthor = await this.authorRepository.getById(id);
    if (!existingAuthor)
      throw new Error(`Cannot delete. Author with ID: ${id} not found.`);
    return await this.authorRepository.delete(id);
  }
}

export default AuthorService;
