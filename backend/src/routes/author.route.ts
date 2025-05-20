import { authorFactory } from "@/factories/author.factory";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import express from "express";

const router = express.Router();
const authorController = authorFactory();

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
