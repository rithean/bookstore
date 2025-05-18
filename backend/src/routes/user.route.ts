import UserController from "@/controllers/user.controller";
import { authenticate, authorize } from "@/middleware/auth.middleware";
import UserRepository from "@/repositories/user.repository";
import UserService from "@/services/user.service";
import express from "express";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = express.Router();

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
