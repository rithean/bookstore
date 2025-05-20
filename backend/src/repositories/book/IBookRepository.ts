import { CreateBookDTO, UpdateBookDTO } from "@/dtos/book.dto";
import { Book, Author, Genre } from "@/generated/prisma";

export type BookWithRelations = Book & {
  author: Author;
  genres: { genre: Genre }[];
};

export interface IBookRepository {
  create(bookDto: CreateBookDTO): Promise<BookWithRelations>;
  findAll(genreId?: string, authorId?: string): Promise<BookWithRelations[]>;
  findById(id: string): Promise<BookWithRelations | null>;
  findByISBN(isbn: string): Promise<BookWithRelations | null>;
  findByAuthor(authorId: string): Promise<BookWithRelations[]>;
  findByGenre(genreId: string): Promise<BookWithRelations[]>;
  update(
    id: string,
    updateDto: UpdateBookDTO
  ): Promise<BookWithRelations | null>;
  softDelete(id: string): Promise<BookWithRelations | null>;
  restore(id: string): Promise<BookWithRelations | null>;
}
