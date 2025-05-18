import express from "express";
import AuthRepository from "@/repositories/auth.repository";
import AuthService from "@/services/auth.service";
import AuthController from "@/controllers/auth.controller";
import { authenticate } from "@/middleware/auth.middleware";

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

const router = express.Router();

router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
router.post("/refresh-token", authController.refreshToken.bind(authController));

router.get("/me", authenticate, authController.getMe.bind(authController));

export default router;
