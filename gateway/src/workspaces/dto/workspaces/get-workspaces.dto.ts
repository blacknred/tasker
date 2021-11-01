import { IntersectionType, PartialType } from '@nestjs/swagger';
import { PaginationDto } from 'src/__shared__/dto/request.dto';
import { CreateWorkspaceDto } from './create-workspace.dto';

export class GetWorkspacesDto extends IntersectionType(
  PartialType(CreateWorkspaceDto),
  PaginationDto,
) {}
