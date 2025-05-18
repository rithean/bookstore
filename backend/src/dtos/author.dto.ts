import { IsOptional, IsString, Length, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class CreateAuthorDTO {
  @IsString()
  @Length(2, 50)
  name!: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsDate() 
  @Type(() => Date) 
  dob?: Date;
}

export class UpdateAuthorDTO {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  name?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dob?: Date;
}
