import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class CreateTokenDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsUrl({}, { message: 'Must be an url' })
  link: string;

  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  exist?: boolean;

  @IsOptional()
  @IsMongoId({ message: 'Invalid identificator' })
  wid?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(7)
  @Type(() => Number)
  days?: number;
}
