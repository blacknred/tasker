import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class GetUsersDto extends PartialType(
  OmitType(CreateUserDto, ['password']),
) {
  // @IsNumber({}, { message: 'Must be an integer' })
  limit: number;
  // @IsString({ message: 'Must be a string' })
  cursor: string;
}
