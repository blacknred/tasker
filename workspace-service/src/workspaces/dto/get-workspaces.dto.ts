import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { PaginationDto, SortingDto } from '../../__shared__/dto/request.dto';
import { CreateWorkspaceDto } from './create-workspace.dto';
import { IsIn, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { IWorkspace } from '../interfaces/workspace.interface';

class WorkspaceSortingDto extends SortingDto {
  @IsOptional()
  @Type(() => String)
  @IsIn(['name', 'description', 'creatorId', 'createdAt', 'updatedAt'], {
    message: 'Must be a one of fields of the Workspace entity',
  })
  'sort.field'?: keyof Omit<IWorkspace, 'id' | 'roles' | 'stages' | 'agents'>;
}

export class GetWorkspacesDto extends IntersectionType(
  PartialType(CreateWorkspaceDto),
  PaginationDto,
  WorkspaceSortingDto,
) {}
