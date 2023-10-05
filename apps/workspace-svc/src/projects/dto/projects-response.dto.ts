import { ApiProperty } from '@nestjs/swagger';
import {
  IProject,
  PaginatedResponseDto,
  paginationMock,
  projectMock,
} from '@taskapp/shared';

export class ProjectsResponseDto extends PaginatedResponseDto<IProject> {
  @ApiProperty({ example: paginationMock(projectMock), required: false })
  readonly data?: {
    hasMore: boolean;
    total: number;
    items: IProject[];
  };
}
