import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { PaginationDto } from 'src/__shared__/dto/request.dto';
import { CreateWorkspaceDto } from './create-workspace.dto';

export class GetWorkspacesDto extends IntersectionType(
  PartialType(PickType(CreateWorkspaceDto, ['name'])),
  PaginationDto,
) {
  @ApiProperty({ example: new Date().toDateString(), required: false })
  createId?: string;

  @ApiProperty({ example: new Date().toDateString(), required: false })
  createdAt?: string;
}
