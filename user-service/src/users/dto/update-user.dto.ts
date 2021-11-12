import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber } from 'class-validator';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['token', 'password']),
) {
  @IsNumber({}, { message: 'Must be a number' })
  id: number;
}
