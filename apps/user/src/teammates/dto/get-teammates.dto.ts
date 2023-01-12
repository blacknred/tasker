import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { PaginatedRequestDto } from '@taskapp/service-core';
import {
  IsDateString,
  IsIn,
  IsOptional,
  IsUUID,
  Length,
} from 'class-validator';

export class GetTeammatesDto extends OmitType(PaginatedRequestDto, [
  'sort.field',
]) {
  @IsOptional()
  @IsIn(['userName', 'createdAt'], {
    message: 'Must be a one of the fields: "userName", "createdAt"',
  })
  'sort.field'?: 'userName' | 'createdAt';

  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
    required: false,
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  projectId?: string;

  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
    required: false,
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  roleId?: string;

  @ApiProperty({ type: 'string', example: 'John Dou', required: false })
  @IsOptional()
  @Length(0, 100, { message: 'Must have up to 100 chars' })
  userName: string;

  @ApiProperty({ type: 'string', example: 'createdAt', required: false })
  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  createdAt?: string;
}
