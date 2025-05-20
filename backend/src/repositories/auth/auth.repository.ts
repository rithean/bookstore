import { db } from "@/config/db";
import { CreateUserDTO } from "@/dtos/user.dto";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@/utils/jwt";
import { Role, User } from "@/generated/prisma";
import bcrypt from "bcryptjs";
import { IAuthRepository } from "./IAuthRepository";

class AuthRepository implements IAuthRepository {
  async register(userData: CreateUserDTO): Promise<Omit<User, "password">> {
    const { name, email, password, role } = userData;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) throw new Error("Email is already in use.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || Role.USER,
        isActive: true,
      },
    });

    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  async login(userData: CreateUserDTO): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Omit<User, "password">;
  }> {
    const { email, password } = userData;

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) throw new Error("Invalid email or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid email or password");

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const { password: _, ...responseUser } = user;

    return { accessToken, refreshToken, user: responseUser };
  }

  async refreshToken(token: string): Promise<{ accessToken: string }> {
    const decoded = verifyRefreshToken(token);

    const user = await db.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) throw new Error("User not found");

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { accessToken };
  }

  async getMe(userId: string): Promise<Omit<User, "password">> {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        phone: true,
        dob: true,
        gender: true,
        address: true,
        avatar: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) throw new Error("User not found");

    return user;
  }
}

export default AuthRepository;
