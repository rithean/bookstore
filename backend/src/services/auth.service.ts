import { CreateUserDTO } from "@/dtos/user.dto";
import AuthRepository from "@/repositories/auth.repository";

class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(userData: CreateUserDTO) {
    return await this.authRepository.register(userData);
  }

  async login(userData: CreateUserDTO) {
    return await this.authRepository.login(userData);
  }

  async refreshToken(token: string) {
    return await this.authRepository.refreshToken(token);
  }

  async getMe(userId: string) {
    return await this.authRepository.getMe(userId);
  }
}

export default AuthService;
