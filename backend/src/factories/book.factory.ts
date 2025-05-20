import BookController from "@/controllers/book.controller";
import BookRepository from "@/repositories/book/book.repository";
import BookService from "@/services/book.service";

export function bookFactory(): BookController {
    const bookRepository = new BookRepository();
    const bookService = new BookService(bookRepository);
    const bookController = new BookController(bookService);

    return bookController;
} 