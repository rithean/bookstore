import { db } from "@/config/db";
import { CreateGenreDTO, UpdateGenreDTO } from "@/dtos/genre.dto";
import { Genre } from "@/generated/prisma";

class GenreRepository {
  async create(genreDto: CreateGenreDTO): Promise<Genre> {
    return db.genre.create({ data: genreDto });
  }

  async findAll(): Promise<Genre[]> {
    return db.genre.findMany({ orderBy: { createdAt: "desc" } });
  }

  async findById(id: string): Promise<Genre | null> {
    return db.genre.findUnique({ where: { id } });
  }

  async update(id: string, updateDto: UpdateGenreDTO): Promise<Genre> {
    return db.genre.update({ where: { id }, data: updateDto });
  }

  async delete(id: string): Promise<Genre> {
    return db.genre.delete({ where: { id } });
  }
}

export default GenreRepository;
