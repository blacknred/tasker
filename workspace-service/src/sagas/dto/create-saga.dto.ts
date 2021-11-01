import {
  IsDateString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AccessDto } from '../../__shared__/dto/request.dto';

export class CreateSagaDto extends AccessDto {
  @IsString({ message: 'Must be a string' })
  @MinLength(5, { message: 'Must include atleast 5 chars' })
  @MaxLength(200, { message: 'Must include no more than 200 chars' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Must be a string' })
  description?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  expiresAt?: string;
}
