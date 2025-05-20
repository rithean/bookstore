import express from "express";
import { authenticate } from "@/middleware/auth.middleware";
import { authFactory } from "@/factories/auth.factory";

const router = express.Router();

const authController = authFactory();

router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
router.post("/refresh-token", authController.refreshToken.bind(authController));

router.get("/me", authenticate, authController.getMe.bind(authController));

export default router;
