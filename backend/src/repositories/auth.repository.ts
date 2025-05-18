import { db } from "@/config/db";
import { CreateUserDTO } from "@/dtos/user.dto";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@/utils/jwt";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

class AuthRepository {
  async register(userData: CreateUserDTO) {
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

    return { accessToken, refreshToken, user };
  }

  async login(userData: CreateUserDTO) {
    const { email, password } = userData;

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) throw new Error("Invalid email or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

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

    return { accessToken, refreshToken, user };
  }

  async refreshToken(token: string) {
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

  async getMe(userId: string) {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) throw new Error("User not found");
    return user;
  }
}

export default AuthRepository;
