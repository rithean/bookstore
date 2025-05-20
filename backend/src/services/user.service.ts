import { UpdateUserDTO } from "@/dtos/user.dto";
import { IUserRepository } from "@/repositories/user/IUserRepository";
import { User } from "@prisma/client";

class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    if (users.length === 0) throw new Error("No users found");
    return users;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error(`User with ID ${id} doesn't exist.`);
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error(`User with email ${email} doesn't exist.`);
    return user;
  }

  async updateUser(id: string, updatedData: UpdateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) throw new Error(`User with ID ${id} doesn't exist.`);

    const updated = await this.userRepository.update(id, updatedData);
    if (!updated) throw new Error(`Failed to update user with ID ${id}.`);

    return updated;
  }

  async deleteUser(id: string): Promise<User> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) throw new Error(`User with ID ${id} doesn't exist.`);

    const deleted = await this.userRepository.delete(id);
    if (!deleted) throw new Error(`Failed to delete user with ID ${id}.`);

    return deleted;
  }
}

export default UserService;
