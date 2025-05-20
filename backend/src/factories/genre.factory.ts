import GenreController from "@/controllers/genre.controller";
import GenreRepository from "@/repositories/genre/genre.repository";
import GenreService from "@/services/genre.service";

export function genreFactory(): GenreController {
    const genreRepository = new GenreRepository();
    const genreService = new GenreService(genreRepository);
    const genreController = new GenreController(genreService);

    return genreController;
}