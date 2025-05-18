import AuthorService from "@/services/author.service";
import { Request, Response } from "express";
import { successResponse, errorResponse } from "@/utils/response";
import { plainToInstance } from "class-transformer";
import { CreateAuthorDTO } from "@/dtos/author.dto";
import { validate } from "class-validator";

class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  async createAuthor(req: Request, res: Response): Promise<void> {
    try {
      const authorDto = plainToInstance(CreateAuthorDTO, req.body);
      const errors = await validate(authorDto);
      if (errors.length > 0) {
        const validataionErrors = errors
          .map((err) => Object.values(err.constraints || {}))
          .flat();
        errorResponse(res, 400, "Validation failed", validataionErrors);
      }

      await this.authorService.createAuthor(authorDto);
      successResponse(res, 201, "Author created successfully");
    } catch (error: any) {
      console.error("Error creating author:", error);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async getAllAuthors(req: Request, res: Response): Promise<void> {
    try {
      const authors = await this.authorService.getAllAuthors();
      successResponse(res, 200, "Display all the authors", authors);
    } catch (error: any) {
      console.error("Error fetching author:", error);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async getAuthorById(req: Request, res: Response): Promise<void> {
    try {
      const author = await this.authorService.getAuthorById(req.params.id);
      successResponse(res, 200, "Display a single author", author);
    } catch (error: any) {
      console.error(`Error fetching author : ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async updateAuthor(req: Request, res: Response): Promise<void> {
    try {
      await this.authorService.updateAuthor(req.params.id, req.body);
      successResponse(res, 200, "Author updated successfully.");
    } catch (error: any) {
      console.error(`Error updating author : ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async deleteAuthor(req: Request, res: Response): Promise<void> {
    try {
      await this.authorService.deleteAuthor(req.params.id);
      successResponse(res, 200, "Author deleted successfully.");
    } catch (error: any) {
      console.error(`Error deleting author : ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }
}

export default AuthorController;
