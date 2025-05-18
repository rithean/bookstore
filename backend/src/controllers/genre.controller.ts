import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import GenreService from "@/services/genre.service";
import { successResponse, errorResponse } from "@/utils/response";
import { CreateGenreDTO, UpdateGenreDTO } from "@/dtos/genre.dto";

class GenreController {
  constructor(private readonly genreService: GenreService) {}

  async createGenre(req: Request, res: Response): Promise<void> {
    try {
      const genreDto = plainToInstance(CreateGenreDTO, req.body);
      const errors = await validate(genreDto);

      if (errors.length > 0) {
        const validationErrors = errors
          .map((err) => Object.values(err.constraints || {}))
          .flat();
        errorResponse(res, 400, "Validation failed", validationErrors);
      }

      await this.genreService.createGenre(genreDto);
      successResponse(res, 201, "Genre created successfully");
    } catch (error: any) {
      console.error("Error creating genre:", error);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async getAllGenres(req: Request, res: Response): Promise<void> {
    try {
      const genres = await this.genreService.getAllGenres();
      successResponse(res, 200, "Genres fetched successfully", genres);
    } catch (error: any) {
      console.error("Error fetching genres:", error);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async getGenreById(req: Request, res: Response): Promise<void> {
    try {
      const genre = await this.genreService.getGenreById(req.params.id);
      if (!genre) {
        errorResponse(res, 404, "Genre not found");
        return;
      }
      successResponse(res, 200, "Genre fetched successfully", genre);
    } catch (error: any) {
      console.error("Error fetching genre:", error);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async updateGenre(req: Request, res: Response): Promise<void> {
    try {
      const updateDto = plainToInstance(UpdateGenreDTO, req.body);
      const errors = await validate(updateDto);

      if (errors.length > 0) {
        const validationErrors = errors
          .map((err) => Object.values(err.constraints || {}))
          .flat();
        errorResponse(res, 400, "Validation failed", validationErrors);
      }

      await this.genreService.updateGenre(req.params.id, updateDto);
      successResponse(res, 200, "Genre updated successfully");
    } catch (error: any) {
      console.error("Error updating genre:", error);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }

  async deleteGenre(req: Request, res: Response): Promise<void> {
    try {
      await this.genreService.deleteGenre(req.params.id);
      successResponse(res, 200, "Genre deleted successfully");
    } catch (error: any) {
      console.error("Error deleting genre:", error);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }
}

export default GenreController;
