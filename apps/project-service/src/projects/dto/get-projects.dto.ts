import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { PaginatedRequestDto } from '@taskapp/service-core';
import { ProjectType } from '@taskapp/shared';
import {
  IsDateString,
  IsEnum,
  IsIn,
  IsOptional,
  Length,
} from 'class-validator';

export class GetProjectsDto extends OmitType(PaginatedRequestDto, [
  'sort.field',
]) {
  @ApiProperty({ type: 'string', example: 'createdAt', required: false })
  @IsOptional()
  @IsIn(['key', 'type', 'name', 'createdAt'], {
    message: 'Must be a one of the fields: "key", "type", "name", "createdAt"',
  })
  'sort.field'?: 'key' | 'type' | 'name' | 'createdAt';

  @ApiProperty({ type: 'string', example: 'SP', required: false })
  @IsOptional()
  @Length(0, 30, { message: 'Must have up to 30 chars' })
  key?: string;

  @ApiProperty({ type: 'string', example: 'Super Project', required: false })
  @IsOptional()
  @Length(0, 100, { message: 'Must have up to 100 chars' })
  name?: string;

  @ApiProperty({
    enum: ProjectType,
    example: ProjectType.SCRUM,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProjectType, {
    message: `Must be a one of the fields: ${Object.keys(ProjectType).join(
      ', ',
    )}`,
  })
  type?: ProjectType;

  @ApiProperty({ type: 'string', example: '2022-08-14 13:55:16.622111', required: false })
  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  createdAt?: string;
}
