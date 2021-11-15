import { IntersectionType, OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsIn,
  IsOptional,
} from 'class-validator';
import { PaginationDto, SortingDto } from 'src/__shared__/dto/request.dto';
import { CreateUserDto } from './create-user.dto';

class UsersSortingDto extends SortingDto {
  @IsOptional()
  @IsIn(['name', 'email', 'createdAt'], {
    message: 'Must be a one of fields of the User entity',
  })
  'sort.field'?: 'name' | 'email' | 'createdAt';
}

export class GetUsersDto extends IntersectionType(
  PartialType(OmitType(CreateUserDto, ['password', 'image', 'emailToken'])),
  PaginationDto,
  UsersSortingDto,
) {
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email' })
  email?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  createdAt?: string;

  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  partial?: boolean;
}
