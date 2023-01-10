import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@taskapp/service-core';
import { IProjectRole } from '@taskapp/shared';
import { projectRoleMock } from './project-role-response.dto';

export const projectRolePaginationMock = {
  items: [projectRoleMock],
  hasMore: true,
  total: 10,
};

export class ProjectRolesResponseDto extends PaginatedResponseDto<IProjectRole> {
  @ApiProperty({ example: projectRolePaginationMock, required: false })
  data?: {
    hasMore: boolean;
    total: number;
    items: IProjectRole[];
  };
}
