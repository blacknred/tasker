import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@taskapp/service-core';
import { IProject } from '@taskapp/shared';
import { projectMock } from './search-record-response.dto';

export const projectPaginationMock = {
  items: [projectMock],
  hasMore: true,
  total: 10,
};

export class ProjectsResponseDto extends PaginatedResponseDto<IProject> {
  @ApiProperty({ example: projectPaginationMock, required: false })
  data?: {
    hasMore: boolean;
    total: number;
    items: IProject[];
  };
}
