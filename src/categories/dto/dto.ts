import { IsOptional, IsString, MaxLength } from 'class-validator';
export class CreateCategoryDto {
  @IsString() @MaxLength(40) name: string;
  @IsOptional() @IsString() color?: string;
}
export class UpdateCategoryDto {
  @IsOptional() @IsString() @MaxLength(40) name?: string;
  @IsOptional() @IsString() color?: string;
}