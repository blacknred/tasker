import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsIn, IsOptional, Min } from 'class-validator';
import { CreateWorkspaceDto } from './create-workspace.dto';

export class SortingDto {
  @IsOptional()
  @Type(() => String)
  @IsIn(['name', 'description', 'type', 'userId', 'priority', 'createdAt'], {
    message: 'Must be a one of fields of the Task entity',
  })
  'sort.field'?:
    | 'name'
    | 'description'
    | 'type'
    | 'userId'
    | 'priority'
    | 'createdAt';

  @IsOptional()
  @Type(() => String)
  @IsIn(['ASC', 'DESC'], { message: 'Must be an ASC or DESC' })
  'sort.order'?: 'ASC' | 'DESC';
}

export class PaginationDto {
  @Type(() => Number)
  @Min(1)
  limit: number;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  offset?: number;
}

export class GetWorkspacesDto extends IntersectionType(
  PartialType(CreateWorkspaceDto),
  PaginationDto,
  SortingDto,
) {}
