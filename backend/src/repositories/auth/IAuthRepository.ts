import { CreateUserDTO } from "@/dtos/user.dto";
import { User } from "@/generated/prisma";

export interface IAuthRepository {
  register(userData: CreateUserDTO): Promise<Omit<User, "password">>;
  login(userData: CreateUserDTO): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Omit<User, "password">;
  }>;
  refreshToken(token: string): Promise<{ accessToken: string }>;
  getMe(userId: string): Promise<Omit<User, "password">>;
}
