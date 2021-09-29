import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumberString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class GetUsersDto extends PartialType(
  OmitType(CreateUserDto, ['password']),
) {
  @IsNumberString({}, { message: 'Must be an number' })
  limit: number;
  @IsString({ message: 'Must be a string' })
  cursor: string;
}
