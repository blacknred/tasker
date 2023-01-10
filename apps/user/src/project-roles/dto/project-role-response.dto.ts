import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@taskapp/service-core';
import { IProjectRole, ProjectPermission } from '@taskapp/shared';

export const projectRoleMock: IProjectRole = {
  id: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  projectId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  name: 'Developer',
  color: '#333333',
  permissions: [
    ProjectPermission.STORY_MANAGEMENT,
    ProjectPermission.TASK_MANAGEMENT,
  ],
  createdAt: '2022-08-14 13:55:16.622111',
  updatedAt: '2022-08-14 13:55:16.622111',
};

export class ProjectRoleResponseDto extends ResponseDto<IProjectRole> {
  @ApiProperty({ example: projectRoleMock, required: false })
  data?: IProjectRole;
}
