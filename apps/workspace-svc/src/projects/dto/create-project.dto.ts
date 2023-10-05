import { ApiProperty } from '@nestjs/swagger';
import { ProjectType, issueMock, projectMock } from '@taskapp/shared';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsHexColor,
  IsOptional,
  IsUUID,
  IsUrl,
  Length,
  MinLength,
  ValidateNested,
} from 'class-validator';

class Tag {
  @ApiProperty({ type: 'string', example: issueMock.tags[0].name })
  @MinLength(1, { message: 'Empty name' })
  readonly name: string;

  @ApiProperty({
    type: 'string',
    example: issueMock.tags[0].color,
    required: false,
  })
  @IsOptional()
  @IsHexColor()
  readonly color?: string;
}

class Status {
  @ApiProperty({ type: 'string', example: issueMock.status.name })
  @MinLength(1, { message: 'Empty name' })
  readonly name: string;

  @ApiProperty({
    type: 'string',
    example: issueMock.status.color,
    required: false,
  })
  @IsOptional()
  @IsHexColor()
  readonly color?: string;

  @ApiProperty({ type: 'boolean', example: issueMock.status.isFirst })
  @IsBoolean()
  readonly isFirst: boolean;

  @ApiProperty({ type: 'boolean', example: issueMock.status.isLast })
  @IsBoolean()
  readonly isLast: boolean;

  @ApiProperty({
    type: 'string',
    example: issueMock.status.transitions,
    isArray: true,
  })
  @IsArray({ message: 'Must be an array' })
  @MinLength(1, { message: 'Empty status name' })
  transitions: string[];
}

export class CreateProjectDto {
  @ApiProperty({ type: 'string', example: projectMock.name })
  @Length(1, 10, { message: 'Must have from 1 to 10 chars' })
  readonly name: string;

  @ApiProperty({
    type: 'string',
    example: projectMock.details,
    required: false,
  })
  @IsOptional()
  @Length(1, 1000, { message: 'Must have from 1 to 1000 chars' })
  readonly details?: string;

  @ApiProperty({
    type: 'string',
    example: projectMock.image,
    required: false,
  })
  @IsOptional()
  @IsUrl(null, { message: 'Must includes a valid ids' })
  image?: string;

  @ApiProperty({ type: 'string', example: projectMock.key })
  @Length(1, 10, { message: 'Must have from 1 to 10 chars' })
  readonly key: string;

  @ApiProperty({
    enum: ProjectType,
    example: projectMock.type,
  })
  @IsEnum(ProjectType, {
    message: `Must be a one of the fields: ${Object.keys(ProjectType).join(
      ', ',
    )}`,
  })
  readonly type: ProjectType;

  @ApiProperty({
    example: projectMock.statusses,
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Must be an array' })
  @ValidateNested()
  statusses?: Status[];

  @ApiProperty({
    example: projectMock,
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Must be an array' })
  @ValidateNested()
  tags?: Tag[];
}
