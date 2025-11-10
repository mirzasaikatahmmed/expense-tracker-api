import { IsArray, IsDateString, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateExpenseDto {
  @IsNumber() 
  @Min(0) 
  amount: number;

  @IsString() 
  categoryId: string;

  @IsOptional() 
  @IsString() 
  currency?: string;

  @IsDateString() 
  date: string;

  @IsOptional() 
  @IsString() 
  @MaxLength(200) 
  note?: string;

  @IsOptional() 
  @IsArray() 
  tags?: string[];
}