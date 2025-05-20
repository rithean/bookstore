import { CreateUserDTO } from "@/dtos/user.dto";
import { IAuthRepository } from "@/repositories/auth/IAuthRepository";

class AuthService {
  constructor(private readonly authRepository: IAuthRepository) {}

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
