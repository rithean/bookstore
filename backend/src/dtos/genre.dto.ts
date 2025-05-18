import { IsOptional, IsString, Length } from "class-validator";

export class CreateGenreDTO {
  @IsString()
  @Length(2, 50)
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateGenreDTO {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
