import { db } from "@/config/db";
import { CreateBookDTO, UpdateBookDTO } from "@/dtos/book.dto";
import { Book, Author, Genre } from "@/generated/prisma";
import { IBookRepository } from "./IBookRepository";

class BookRepository implements IBookRepository {
  async create(bookDto: CreateBookDTO): Promise<
    Book & {
      author: Author;
      genres: { genre: Genre }[];
    }
  > {
    const { genreIds, ...bookData } = bookDto;

    const book = await db.book.create({
      data: {
        ...bookData,
        genres: {
          create: genreIds.map((genreId) => ({
            genre: {
              connect: { id: genreId },
            },
          })),
        },
      },
      include: {
        author: true,
        genres: {
          include: { genre: true },
        },
      },
    });

    return book;
  }

  async findAll(
    genreId?: string,
    authorId?: string
  ): Promise<
    (Book & {
      author: Author;
      genres: { genre: Genre }[];
    })[]
  > {
    const whereClause: any = {
      isDeleted: false,
      ...(authorId && { authorId }),
    };

    const books = await db.book.findMany({
      where: whereClause,
      include: {
        author: true,
        genres: {
          include: { genre: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const filteredBooks = genreId
      ? books.filter((book) => book.genres.some((g) => g.genreId === genreId))
      : books;

    return filteredBooks;
  }

  async findById(id: string): Promise<
    | (Book & {
        author: Author;
        genres: { genre: Genre }[];
      })
    | null
  > {
    const book = await db.book.findUnique({
      where: { id },
      include: {
        author: true,
        genres: {
          include: { genre: true },
        },
      },
    });

    if (!book || book.isDeleted) return null;
    return book;
  }

  async findByISBN(isbn: string): Promise<
    | (Book & {
        author: Author;
        genres: { genre: Genre }[];
      })
    | null
  > {
    const book = await db.book.findUnique({
      where: { isbn },
      include: {
        author: true,
        genres: {
          include: { genre: true },
        },
      },
    });

    if (!book || book.isDeleted) return null;
    return book;
  }

  async findByAuthor(authorId: string): Promise<
    (Book & {
      author: Author;
      genres: { genre: Genre }[];
    })[]
  > {
    const books = await db.book.findMany({
      where: {
        authorId,
        isDeleted: false,
      },
      include: {
        author: true,
        genres: {
          include: { genre: true },
        },
      },
    });

    return books;
  }

  async findByGenre(genreId: string): Promise<
    (Book & {
      author: Author;
      genres: { genre: Genre }[];
    })[]
  > {
    const bookGenres = await db.bookGenre.findMany({
      where: { genreId },
      include: {
        book: {
          include: {
            author: true,
            genres: {
              include: { genre: true },
            },
          },
        },
      },
    });

    return bookGenres.map((bg) => bg.book).filter((b) => !b.isDeleted);
  }

  async update(
    id: string,
    updateDto: UpdateBookDTO
  ): Promise<
    | (Book & {
        author: Author;
        genres: { genre: Genre }[];
      })
    | null
  > {
    const existing = await db.book.findUnique({
      where: { id },
      include: { genres: true },
    });

    if (!existing || existing.isDeleted) return null;

    const { genreIds, ...dataToUpdate } = updateDto;

    if (genreIds) {
      await db.bookGenre.deleteMany({
        where: { bookId: id },
      });

      await db.bookGenre.createMany({
        data: genreIds.map((genreId) => ({
          bookId: id,
          genreId,
        })),
      });
    }

    const updated = await db.book.update({
      where: { id },
      data: dataToUpdate,
      include: {
        author: true,
        genres: {
          include: { genre: true },
        },
      },
    });

    return updated;
  }

  async softDelete(id: string): Promise<
    | (Book & {
        author: Author;
        genres: { genre: Genre }[];
      })
    | null
  > {
    const book = await db.book.findUnique({
      where: { id },
      include: {
        author: true,
        genres: {
          include: { genre: true },
        },
      },
    });
    if (!book || book.isDeleted) return null;

    const updated = await db.book.update({
      where: { id },
      data: { isDeleted: true },
      include: {
        author: true,
        genres: {
          include: { genre: true },
        },
      },
    });

    return updated;
  }

  async restore(id: string): Promise<
    | (Book & {
        author: Author;
        genres: { genre: Genre }[];
      })
    | null
  > {
    const book = await db.book.findUnique({
      where: { id },
      include: {
        author: true,
        genres: {
          include: { genre: true },
        },
      },
    });

    if (!book || !book.isDeleted) return null;

    const updated = await db.book.update({
      where: { id },
      data: { isDeleted: false },
      include: {
        author: true,
        genres: {
          include: { genre: true },
        },
      },
    });

    return updated;
  }
}

export default BookRepository;
