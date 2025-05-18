import BookService from "@/services/book.service";
import { errorResponse, successResponse } from "@/utils/response";
import { Request, Response } from "express";

class BookController {
  constructor(private readonly bookService: BookService) {}

  async createBook(req: Request, res: Response): Promise<void> {
    try {
      await this.bookService.createBook(req.body);
      successResponse(res, 201, "Book created successfully.");
    } catch (error: any) {
      console.error(`Error creating book: ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const genreId = req.query.genreId as string;
      const authorId = req.query.authorId as string;

      const books = await this.bookService.getAllBooks(genreId, authorId);
      successResponse(res, 200, books);
    } catch (error: any) {
      console.error(`Error fetching books: ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async getBookById(req: Request, res: Response): Promise<void> {
    try {
      const book = await this.bookService.getBookById(req.params.id);
      if (!book) {
        errorResponse(res, 404, "Book not found.");
      }
      successResponse(res, 200, book);
    } catch (error: any) {
      console.error(`Error fetching book by ID: ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async getBookByISBN(req: Request, res: Response): Promise<void> {
    try {
      const book = await this.bookService.getBookByISBN(req.params.isbn);
      if (!book) {
        errorResponse(res, 404, "Book not found.");
      }
      successResponse(res, 200, book);
    } catch (error: any) {
      console.error(`Error fetching book by ISBN: ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async getBookByAuthor(req: Request, res: Response): Promise<void> {
    try {
      const books = await this.bookService.getBooksByAuthor(
        req.params.authorId
      );
      successResponse(res, 200, books);
    } catch (error: any) {
      console.error(`Error fetching books by author: ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async getBookByGenre(req: Request, res: Response): Promise<void> {
    try {
      const books = await this.bookService.getBooksByGenre(req.params.genreId);
      successResponse(res, 200, books);
    } catch (error: any) {
      console.error(`Error fetching books by genre: ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async updateBook(req: Request, res: Response): Promise<void> {
    try {
      await this.bookService.updateBook(req.params.id, req.body);
      successResponse(res, 200, "Book updated successfully.");
    } catch (error: any) {
      console.error(`Error updating book: ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async softDelete(req: Request, res: Response): Promise<void> {
    try {
      await this.bookService.softDelete(req.params.id);
      successResponse(res, 200, "Book deleted successfully.");
    } catch (error: any) {
      console.error(`Error deleting book: ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async restoreBook(req: Request, res: Response): Promise<void> {
    try {
      const book = await this.bookService.restoreBook(req.params.id);
      if (!book) {
        errorResponse(res, 404, "Book not found or not deleted.");
      }
      successResponse(res, 200, "Book restored successfully.");
    } catch (error: any) {
      console.error(`Error restoring book: ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }
}

export default BookController;
