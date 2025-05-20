import { Router } from "express";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import { bookFactory } from "@/factories/book.factory";

const router = Router();
const bookController = bookFactory();

router.post(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  bookController.createBook.bind(bookController)
);

router.get("/", authenticate, bookController.getAllBooks.bind(bookController));
router.get(
  "/:id",
  authenticate,
  bookController.getBookById.bind(bookController)
);
router.get(
  "/isbn/:isbn",
  authenticate,
  bookController.getBookByISBN.bind(bookController)
);
router.get(
  "/author/:authorId",
  authenticate,
  bookController.getBookByAuthor.bind(bookController)
);
router.get(
  "/genre/:genreId",
  authenticate,
  bookController.getBookByGenre.bind(bookController)
);

router.put(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  bookController.updateBook.bind(bookController)
);

router.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  bookController.softDelete.bind(bookController)
);

router.patch(
  "/restore/:id",
  authenticate,
  authorize(["ADMIN"]),
  bookController.restoreBook.bind(bookController)
);

export default router;
