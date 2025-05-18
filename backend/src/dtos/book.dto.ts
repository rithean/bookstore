import { BookStatus } from "@/generated/prisma";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
  IsArray,
  IsEnum,
  IsBoolean,
  Matches,
} from "class-validator";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export class CreateBookDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @Matches(objectIdRegex, { message: "Invalid MongoDB ObjectId" })
  authorId!: string;

  @IsArray()
  @IsString({ each: true })
  @Matches(objectIdRegex, {
    each: true,
    message: "Each genreId must be a valid ObjectId",
  })
  genreIds!: string[];

  @IsNumber()
  price!: number;

  @IsString()
  @IsNotEmpty()
  isbn!: string;

  @IsDateString()
  publishDate!: string;

  @IsNumber()
  quantity!: number;

  @IsOptional()
  @IsEnum(BookStatus)
  status?: BookStatus;

  @IsString()
  @IsOptional()
  coverUrl?: string;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}

export class UpdateBookDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @Matches(objectIdRegex, { message: "Invalid MongoDB ObjectId" })
  authorId?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Matches(objectIdRegex, {
    each: true,
    message: "Each genreId must be a valid ObjectId",
  })
  genreIds?: string[];

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  isbn?: string;

  @IsDateString()
  @IsOptional()
  publishDate?: string;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsEnum(BookStatus)
  @IsOptional()
  status?: BookStatus;

  @IsString()
  @IsOptional()
  coverUrl?: string;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
