import { ApiProperty } from '@nestjs/swagger';
import { OmitType } from '@nestjs/mapped-types';
import { PaginatedRequestDto } from '@taskapp/service-core';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsIn,
  IsOptional,
  Length,
  IsPhoneNumber,
} from 'class-validator';

export class GetUsersDto extends OmitType(PaginatedRequestDto, ['sort.field']) {
  @IsOptional()
  @IsIn(['username', 'email', 'isAdmin', 'isDeleted', 'createdAt'], {
    message: 'Must be a one of fields of the User entity',
  })
  'sort.field'?: 'username' | 'email' | 'createdAt';

  @ApiProperty({ type: 'string', example: 'Joh', required: false })
  @IsOptional()
  @Length(5, 100, { message: 'Must have from 5 to 100 chars' })
  username?: string;

  @ApiProperty({ type: 'string', example: 'test@email.com' })
  @IsOptional()
  @IsEmail(null, { message: 'Non valid email' })
  email?: string;

  @ApiProperty({ type: 'string', example: '+1 893 287 345', required: false })
  @IsOptional()
  @IsPhoneNumber(null, { message: 'Non valid phone number' })
  phone?: string;

  @ApiProperty({ type: 'boolean', example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  isAdmin?: boolean;

  @ApiProperty({ type: 'boolean', example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  isDeleted?: boolean;

  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  createdAt?: string;
}
