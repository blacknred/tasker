import { ApiProperty } from '@nestjs/swagger';
import { IHydratedProject, PaginatedResponseDto } from '@taskapp/shared';
import { projectMock } from './project-response.dto';

export const projectPaginationMock = {
  items: [projectMock],
  hasMore: true,
  total: 10,
};

export class ProjectsResponseDto extends PaginatedResponseDto<IHydratedProject> {
  @ApiProperty({ example: projectPaginationMock, required: false })
  readonly data?: {
    hasMore: boolean;
    total: number;
    items: IHydratedProject[];
  };
}
