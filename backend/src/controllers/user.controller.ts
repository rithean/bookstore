import UserService from "@/services/user.service";
import { successResponse, errorResponse } from "@/utils/response";
import { User } from "@prisma/client";
import { Request, Response } from "express";

class UserController {
  constructor(private readonly userService: UserService) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users: User[] = await this.userService.getAllUsers();
      successResponse(res, 200, "Users fetched successfully", users);
    } catch (error: any) {
      errorResponse(res, 500, "Error fetching users", error);
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user = await this.userService.getUserById(id);
      successResponse(res, 200, "User fetched successfully", user);
    } catch (error: any) {
      errorResponse(res, 500, "Error fetching user", error);
    }
  }

  async getUserByEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.params;
    try {
      const user = await this.userService.getUserByEmail(email);
      successResponse(res, 200, "User fetched successfully", user);
    } catch (error: any) {
      errorResponse(res, 500, "Error fetching user", error);
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      const updatedUser = await this.userService.updateUser(id, updatedData);
      successResponse(res, 200, "User updated successfully", updatedUser);
    } catch (error: any) {
      errorResponse(res, 500, "Error updating user", error);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await this.userService.deleteUser(id);
      successResponse(res, 200, "User deleted successfully", null);
    } catch (error: any) {
      errorResponse(res, 500, "Error deleting user", error);
    }
  }
}

export default UserController;
