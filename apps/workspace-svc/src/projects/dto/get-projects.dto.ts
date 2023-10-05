import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { PaginatedRequestDto, ProjectType, projectMock } from '@taskapp/shared';
import { IsEnum, IsIn, IsOptional, IsUUID, Length } from 'class-validator';

export class GetProjectsDto extends OmitType(PaginatedRequestDto, [
  'sort.field',
]) {
  @ApiProperty({ type: 'string', example: 'createdAt', required: false })
  @IsOptional()
  @IsIn(['name', 'type', 'key', 'createdAt'], {
    message: 'Must be a one of the fields: name, type, key, createdAt',
  })
  readonly 'sort.field'?: 'name' | 'type' | 'key' | 'createdAt';

  @ApiProperty({ type: 'string', example: projectMock.name, required: false })
  @IsOptional()
  @Length(0, 100, { message: 'Must have up to 100 chars' })
  readonly name?: string;

  @ApiProperty({
    enum: ProjectType,
    example: projectMock.type,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProjectType, {
    message: `Must be a one of the fields: ${Object.keys(ProjectType).join(
      ', ',
    )}`,
  })
  readonly type?: ProjectType;
}
