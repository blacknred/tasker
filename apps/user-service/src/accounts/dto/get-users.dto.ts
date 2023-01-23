import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { PaginatedRequestDto } from '@taskapp/service-core';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsLocale,
  IsOptional,
  Length,
} from 'class-validator';

export class GetUsersDto extends OmitType(PaginatedRequestDto, ['sort.field']) {
  @IsOptional()
  @IsIn(['username', 'name', 'email', 'locale', 'createdAt'], {
    message:
      'Must be a one of fields: "username", "name", "email", "locale", "createdAt"',
  })
  'sort.field'?: 'username' | 'name' | 'email' | 'locale' | 'createdAt';

  @ApiProperty({ type: 'string', example: 'jdou', required: false })
  @IsOptional()
  @Length(0, 30, { message: 'Must have up to 30 chars' })
  username?: string;

  @ApiProperty({ type: 'string', example: 'John Dou', required: false })
  @IsOptional()
  @Length(0, 100, { message: 'Must have up to 30 chars' })
  name?: string;

  @ApiProperty({ type: 'string', example: 'test@email.com', required: true })
  @IsOptional()
  @IsEmail(null, { message: 'Non valid email' })
  email?: string;

  @ApiProperty({ type: 'string', example: 'en_EN', required: false })
  @IsOptional()
  @IsLocale({ message: 'Non valid locale' })
  locale?: string;

  @ApiProperty({
    type: 'string',
    example: '2022-08-14 13:55:16.622111',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  createdAt?: string;
}
