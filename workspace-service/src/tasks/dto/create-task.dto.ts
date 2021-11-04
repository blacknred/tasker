import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AccessDto } from 'src/__shared__/dto/request.dto';
import { ObjectID } from 'typeorm';

export class CreateTaskDto extends AccessDto {
  @IsString({ message: 'Must be a string' })
  @MinLength(5, { message: 'Must include atleast 5 chars' })
  @MaxLength(500, { message: 'Must include no more than 500 chars' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Must be a string' })
  description?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  expiresAt?: string;

  @IsString({ message: 'Must be a string' })
  stage: string;

  @IsOptional()
  @IsString({ message: 'Must be a string' })
  label?: string;

  @IsOptional()
  @IsMongoId({ message: 'Invalid identificator' })
  assigneeId?: string;

  @IsOptional()
  @IsMongoId({ message: 'Invalid identificator', each: true })
  sagaIds?: ObjectID[];
}
