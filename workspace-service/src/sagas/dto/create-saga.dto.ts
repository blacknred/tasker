import { Optional } from '@nestjs/common';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateSagaDto {
  @IsString({ message: 'Must be a string' })
  @MinLength(5, { message: 'Must include atleast 5 chars' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Must be a string' })
  description?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  expiresAt?: string;

  @Optional()
  @IsNumber({}, { message: 'Must be an integer' })
  userId: number;
}
