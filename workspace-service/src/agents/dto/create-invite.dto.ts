import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { AccessDto } from 'src/__shared__/dto/request.dto';

export class CreateInviteDto extends AccessDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsUrl({}, { message: 'Must be an url' })
  link: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(7)
  @Type(() => Number)
  dtl?: number;
}
