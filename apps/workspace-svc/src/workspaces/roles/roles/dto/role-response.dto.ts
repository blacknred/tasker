import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@taskapp/service-core';
import { IRole, Permission } from '@taskapp/shared';

export const roleMock: IRole = {
  id: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  projectId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  name: 'Developer',
  color: '#333333',
  permissions: [Permission.STORY_MANAGEMENT, Permission.TASK_MANAGEMENT],
  createdAt: '2022-08-14 13:55:16.622111',
  updatedAt: '2022-08-14 13:55:16.622111',
};

export class RoleResponseDto extends ResponseDto<IRole> {
  @ApiProperty({ example: roleMock, required: false })
  data?: IRole;
}
