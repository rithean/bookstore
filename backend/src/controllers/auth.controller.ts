import AuthService from "@/services/auth.service";
import { errorResponse, successResponse } from "@/utils/response";
import { Request, Response } from "express";

class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(req: Request, res: Response): Promise<void> {
    const userData = req.body;
    try {
      await this.authService.register(userData);
      successResponse(res, 201, "User registered successfully");
    } catch (error: any) {
      console.error("Registration error:", error);
      errorResponse(res, 500, "Error registering user", error);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const userData = req.body;
    try {
      const user = await this.authService.login(userData);
      successResponse(res, 200, "User logged in successfully", user);
    } catch (error: any) {
      console.error("Login error:", error);
      errorResponse(res, 500, "Error logging in user", error);
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    const { token } = req.body;
    try {
      const newToken = await this.authService.refreshToken(token);
      successResponse(res, 200, "Token refreshed successfully", newToken);
    } catch (error: any) {
      console.error("Token refresh error:", error);
      errorResponse(res, 500, "Error refreshing token", error);
    }
  }

  async getMe(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.authService.getMe(req.user.id);
      successResponse(res, 200, "Display user information", user);
    } catch (error: any) {
      console.error(`Error retrieving user: ${error}`);
      errorResponse(res, 500, error.message || "Internal Server Error", error);
    }
  }
}

export default AuthController;
