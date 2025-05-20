import { UpdateUserDTO } from "@/dtos/user.dto";
import { User } from "@/generated/prisma";

export interface IUserRepository {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, updateDto: UpdateUserDTO): Promise<User>;
    delete(id: string): Promise<User>;
}