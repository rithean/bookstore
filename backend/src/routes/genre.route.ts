import { Router } from "express";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import { genreFactory } from "@/factories/genre.factory";

const router = Router();

const genreController = genreFactory();

router.post(
  "/",
  authenticate,
  authorize(["ADMIN"]),
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
  genreController.updateGenre.bind(genreController)
);

router.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  genreController.deleteGenre.bind(genreController)
);

export default router;
