import express from "express";
import AuthorRepository from "@/repositories/author.repository";
import AuthorService from "@/services/author.service";
import AuthorController from "@/controllers/author.controller";
import { authenticate, authorize } from "@/middleware/auth.middleware";

const authorRepository = new AuthorRepository();
const authorService = new AuthorService(authorRepository);
const authorController = new AuthorController(authorService);

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorController.getAllAuthors.bind(authorController)
);
router.get(
  "/:id",
  authenticate,
  authorController.getAuthorById.bind(authorController)
);

router.post(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  authorController.createAuthor.bind(authorController)
);

router.put(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  authorController.updateAuthor.bind(authorController)
);

router.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  authorController.deleteAuthor.bind(authorController)
);

export default router;
