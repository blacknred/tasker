import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class GetUsersDto extends PartialType(CreateUserDto) {
  @IsNumber(null, { message: 'Must be an integer' })
  limit: number;
  @IsString({ message: 'Must be a string' })
  cursor: string;
}
