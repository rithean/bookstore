import { CreateBookDTO, UpdateBookDTO } from "@/dtos/book.dto";
import { Book } from "@/generated/prisma";
import BookRepository from "@/repositories/book.repository";

class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async createBook(bookDto: CreateBookDTO): Promise<Book> {
    return await this.bookRepository.create(bookDto);
  }

  async getAllBooks(genreId?: string, authorId?: string): Promise<Book[]> {
    const books = await this.bookRepository.findAll(genreId, authorId);
    if (books.length === 0) throw new Error("No books found.");
    return books;
  }

  async getBookById(id: string): Promise<Book> {
    const book = await this.bookRepository.findById(id);
    if (!book) throw new Error("Book not found.");
    return book;
  }

  async getBookByISBN(isbn: string): Promise<Book> {
    const book = await this.bookRepository.findByISBN(isbn);
    if (!book) throw new Error("Book not found.");
    return book;
  }

  async getBooksByAuthor(authorId: string): Promise<Book[]> {
    const books = await this.bookRepository.findByAuthor(authorId);
    if (books.length === 0) throw new Error("No books found for this author.");
    return books;
  }

  async getBooksByGenre(genreId: string): Promise<Book[]> {
    const books = await this.bookRepository.findByGenre(genreId);
    if (books.length === 0) throw new Error("No books found for this genre.");
    return books;
  }

  async updateBook(id: string, updateDto: UpdateBookDTO): Promise<Book> {
    const updatedBook = await this.bookRepository.update(id, updateDto);
    if (!updatedBook) throw new Error("Failed to update book.");
    return updatedBook;
  }

  async softDelete(id: string): Promise<Book> {
    const deletedBook = await this.bookRepository.softDelete(id);
    if (!deletedBook) throw new Error("Book not found or already deleted.");
    return deletedBook;
  }

  async restoreBook(id: string): Promise<Book> {
    const restoredBook = await this.bookRepository.restore(id);
    if (!restoredBook) throw new Error("Book not found or not deleted.");
    return restoredBook;
  }
}

export default BookService;
