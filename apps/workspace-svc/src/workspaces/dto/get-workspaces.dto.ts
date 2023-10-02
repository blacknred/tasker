import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { PaginatedRequestDto } from '@taskapp/shared';
import { IsIn, IsOptional } from 'class-validator';

export class GetWorkspacesDto extends OmitType(PaginatedRequestDto, [
  'sort.field',
]) {
  @ApiProperty({ type: 'string', example: 'createdAt', required: false })
  @IsOptional()
  @IsIn(['name', 'createdAt'], {
    message: 'Must be a one of the fields: "name", "createdAt"',
  })
  readonly 'sort.field'?: 'name' | 'createdAt';
}
