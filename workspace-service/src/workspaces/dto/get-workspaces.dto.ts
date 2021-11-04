import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types';
import { IsDateString, IsIn, IsNumber, IsOptional } from 'class-validator';
import { PaginationDto, SortingDto } from '../../__shared__/dto/request.dto';
import { CreateWorkspaceDto } from './create-workspace.dto';

class WorkspacesSortingDto extends SortingDto {
  @IsOptional()
  @IsIn(['name', 'creatorId', 'createdAt'], {
    message: 'Must be a one of fields of the Workspace entity',
  })
  'sort.field'?: 'name' | 'creatorId' | 'createdAt';
}

export class GetWorkspacesDto extends IntersectionType(
  PartialType(PickType(CreateWorkspaceDto, ['name'])),
  PaginationDto,
  WorkspacesSortingDto,
) {
  @IsOptional()
  @IsNumber({}, { message: 'Must be an integer' })
  creatorId: number;

  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  createdAt?: string;
}
