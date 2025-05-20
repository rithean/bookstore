import AuthorRepository from "@/repositories/author/author.repository";
import AuthorService from "@/services/author.service";
import AuthorController from "@/controllers/author.controller";

export function authorFactory(): AuthorController {
  const authorRepository = new AuthorRepository();
  const authorService = new AuthorService(authorRepository);
  const authorController = new AuthorController(authorService);

  return authorController;
}
