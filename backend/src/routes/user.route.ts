import { userFactory } from "@/factories/user.factory";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import express from "express";

const router = express.Router();
const userController = userFactory();

router.get(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  userController.getAllUsers.bind(userController)
);
router.get(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  userController.getUserById.bind(userController)
);
router.get(
  "/email/:email",
  authenticate,
  authorize(["ADMIN"]),
  userController.getUserByEmail.bind(userController)
);

router.put(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  userController.updateUser.bind(userController)
);

router.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  userController.deleteUser.bind(userController)
);

export default router;
