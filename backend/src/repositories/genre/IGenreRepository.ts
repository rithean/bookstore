import { CreateGenreDTO, UpdateGenreDTO } from "@/dtos/genre.dto";
import { Genre } from "@/generated/prisma";

export interface IGenreRepository {
  create(genreDto: CreateGenreDTO): Promise<Genre>;
  findAll(): Promise<Genre[]>;
  findById(id: string): Promise<Genre | null>;
  update(id: string, updateDto: UpdateGenreDTO): Promise<Genre>;
  delete(id: string): Promise<Genre>;
}
