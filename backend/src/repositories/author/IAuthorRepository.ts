import { CreateAuthorDTO, UpdateAuthorDTO } from "@/dtos/author.dto";
import { Author } from "@/generated/prisma";

export interface IAuthorRepository {
    create(authorDto: CreateAuthorDTO): Promise<Author>;
    findAll(): Promise<Author[]>;
    findById(id: string): Promise<Author | null>;
    update(id: string, updateDto: UpdateAuthorDTO): Promise<Author>;
    delete(id: string): Promise<Author>;
}