import { db } from "@/config/db";
import { CreateBookDTO, UpdateBookDTO } from "@/dtos/book.dto";
import { Book } from "@/generated/prisma";

class BookRepository {
  async create(bookDto: CreateBookDTO): Promise<any> {
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

    return this._formatBookResponse(book);
  }

  async findAll(genreId?: string, authorId?: string): Promise<any[]> {
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

    return filteredBooks.map(this._formatBookResponse);
  }

  async findById(id: string): Promise<any | null> {
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
    return this._formatBookResponse(book);
  }

  async findByISBN(isbn: string): Promise<any | null> {
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
    return this._formatBookResponse(book);
  }

  async findByAuthor(authorId: string): Promise<any[]> {
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

    return books.map(this._formatBookResponse);
  }

  async findByGenre(genreId: string): Promise<any[]> {
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

    return bookGenres
      .map((bg) => bg.book)
      .filter((b) => !b.isDeleted)
      .map(this._formatBookResponse);
  }

  async update(id: string, updateDto: UpdateBookDTO): Promise<any | null> {
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

    return this._formatBookResponse(updated);
  }

  async softDelete(id: string): Promise<any | null> {
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

    return this._formatBookResponse(updated);
  }

  async restore(id: string): Promise<any | null> {
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

    return this._formatBookResponse(updated);
  }

  private _formatBookResponse(book: any): any {
    return {
      id: book.id,
      title: book.title,
      description: book.description,
      isbn: book.isbn,
      price: book.price,
      quantity: book.quantity,
      publishDate: book.publishDate,
      status: book.status,
      coverUrl: book.coverUrl,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
      author: book.author
        ? {
            id: book.author.id,
            name: book.author.name,
            bio: book.author.bio,
            avatar: book.author.avatar,
          }
        : null,
      genres: book.genres.map((bg: any) => ({
        id: bg.genre.id,
        name: bg.genre.name,
        description: bg.genre.description,
      })),
    };
  }
}

export default BookRepository;
