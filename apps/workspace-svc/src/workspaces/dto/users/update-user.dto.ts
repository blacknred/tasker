import { ApiProperty, PartialType } from '@nestjs/swagger';
import { FilterUrlField, userMock } from '@taskapp/shared';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsLocale,
  IsOptional,
  IsUUID,
  IsUrl,
  Length,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

class FilterUrlDto {
  @IsEnum(FilterUrlField, {
    message: `Must be a one of the fields: ${Object.keys(FilterUrlField).join(
      ', ',
    )}`,
  })
  readonly field: FilterUrlField;

  @Length(1, 100, { message: 'Must have from 1 to 100 chars' })
  readonly value: string | number;
}

class Filter {
  @ApiProperty({ type: 'string', example: userMock.filters[0].name })
  @MinLength(1, { message: 'Empty name' })
  readonly name: string;

  @ApiProperty({ type: 'string', example: userMock.filters[0].url })
  @IsUrl(null, { message: 'Must includes a valid url' })
  @Transform(({ value }) => new URLSearchParams(value).entries())
  @Transform(() => FilterUrlDto)
  @ValidateNested()
  readonly url: FilterUrlDto[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ type: 'string', example: userMock.firstName, required: false })
  @IsOptional()
  @Length(1, 100, { message: 'Must have from 1 to 100 chars' })
  readonly firstName?: string;

  @ApiProperty({ type: 'string', example: userMock.lastName, required: false })
  @IsOptional()
  @Length(1, 100, { message: 'Must have from 1 to 100 chars' })
  readonly lastName?: string;

  @ApiProperty({
    type: 'string',
    example: userMock.details,
    required: false,
  })
  @IsOptional()
  @Length(1, 100, { message: 'Must have from 1 to 100 chars' })
  readonly details?: string;

  @ApiProperty({ type: 'boolean', example: userMock.isActive, required: false })
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;

  @ApiProperty({
    type: 'string',
    example: userMock.image,
    required: false,
  })
  @IsOptional()
  @IsUrl(null, { message: 'Must includes a valid url' })
  readonly image?: string;

  @ApiProperty({ type: 'string', example: userMock.locale, required: false })
  @IsOptional()
  @IsLocale()
  readonly locale?: string;

  @ApiProperty({
    type: 'string',
    isArray: true,
    example: userMock.filters,
  })
  @IsOptional()
  @IsArray({ message: 'Must be an array' })
  @ValidateNested()
  readonly filters?: Filter[];

  @ApiProperty({
    type: 'uuid',
    isArray: true,
    example: [userMock.roles[0].id],
  })
  @IsOptional()
  @IsArray({ message: 'Must be an array' })
  @IsUUID(4, { message: 'Must be an uuid', each: true })
  readonly roles?: string[];

  @ApiProperty({
    type: 'uuid',
    isArray: true,
    example: [userMock.projects[0].id],
  })
  @IsOptional()
  @IsArray({ message: 'Must be an array' })
  @IsUUID(4, { message: 'Must be an uuid', each: true })
  readonly projects?: string[];
}
