import { Router } from "express";
import GenreRepository from "@/repositories/genre.repository";
import GenreController from "@/controllers/genre.controller";
import GenreService from "@/services/genre.service";
import { CreateGenreDTO, UpdateGenreDTO } from "@/dtos/genre.dto";
import { validateDTO } from "@/middleware/validate.middleware";
import { authenticate, authorize } from "@/middleware/auth.middleware";

const router = Router();

const genreController = new GenreController(
  new GenreService(new GenreRepository())
);

router.post(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  validateDTO(CreateGenreDTO),
  genreController.createGenre.bind(genreController)
);

router.get(
  "/",
  authenticate,
  genreController.getAllGenres.bind(genreController)
);

router.get(
  "/:id",
  authenticate,
  genreController.getGenreById.bind(genreController)
);

router.put(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  validateDTO(UpdateGenreDTO),
  genreController.updateGenre.bind(genreController)
);

router.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  genreController.deleteGenre.bind(genreController)
);

export default router;
