import { CreateGenreDTO, UpdateGenreDTO } from "@/dtos/genre.dto";
import { Genre } from "@/generated/prisma";
import { IGenreRepository } from "@/repositories/genre/IGenreRepository";

class GenreService {
  constructor(private readonly genreRepository: IGenreRepository) {}

  async createGenre(genreDto: CreateGenreDTO): Promise<Genre> {
    return this.genreRepository.create(genreDto);
  }

  async getAllGenres(): Promise<Genre[]> {
    const genres = await this.genreRepository.findAll();
    if (!genres || genres.length === 0) throw new Error("No genres found.");
    return genres;
  }

  async getGenreById(id: string): Promise<Genre> {
    const genre = await this.genreRepository.findById(id);
    if (!genre) throw new Error(`Genre with ID ${id} not found.`);
    return genre;
  }

  async updateGenre(id: string, updateDto: UpdateGenreDTO): Promise<Genre> {
    const existingGenre = await this.genreRepository.findById(id);
    if (!existingGenre) throw new Error(`Genre with ID ${id} not found.`);

    const updated = await this.genreRepository.update(id, updateDto);
    if (!updated) throw new Error(`Failed to update genre with ID ${id}`);

    return updated;
  }

  async deleteGenre(id: string): Promise<Genre> {
    const existingGenre = await this.genreRepository.findById(id);
    if (!existingGenre) throw new Error(`Genre with ID ${id} not found.`);

    const deleted = await this.genreRepository.delete(id);
    if (!deleted) throw new Error(`Failed to delete genre with ID ${id}`);
    
    return deleted;
  }
}

export default GenreService;
