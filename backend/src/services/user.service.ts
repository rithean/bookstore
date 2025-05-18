import { UpdateUserDTO } from "@/dtos/user.dto";
import UserRepository from "@/repositories/user.repository";
import { User } from "@prisma/client";

class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.getAll();
    if (users.length === 0) throw new Error("No users found");
    return users;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.getById(id);
    if (!user) throw new Error(`User with ID ${id} doesn't exist.`);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.getByEmail(email);
    if (!user) throw new Error(`User with email ${email} doesn't exist.`);
    return user;
  }

  async updateUser(id: string, updatedData: UpdateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.getById(id);
    if (!existingUser) throw new Error(`User with ID ${id} doesn't exist.`);
    return await this.userRepository.update(id, updatedData);
  }

  async deleteUser(id: string): Promise<User> {
    const existingUser = await this.userRepository.getById(id);
    if (!existingUser) throw new Error(`User with ID ${id} doesn't exist.`);
    return await this.userRepository.delete(id);
  }
}

export default UserService;
