import AuthController from "@/controllers/auth.controller";
import AuthRepository from "@/repositories/auth/auth.repository";
import AuthService from "@/services/auth.service";

export function authFactory(): AuthController {
    const authRepository = new AuthRepository();
    const authService = new AuthService(authRepository);
    const authController = new AuthController(authService);
    
    return authController;
}