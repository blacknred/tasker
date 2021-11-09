import { ApiProperty } from '@nestjs/swagger';
import { BaseLabel, BaseStage } from 'src/workspaces/interfaces/task.interface';
import {
  IRole,
  IWorkspace,
  Privilege,
} from 'src/workspaces/interfaces/workspace.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';

export const roleMock: IRole = {
  name: 'testrole',
  privileges: [Privilege.EDIT_WORKSPACE],
};

export const workspaceMock: IWorkspace = {
  id: '5r185c3vfb991ee66b486ccb',
  name: 'testworkspace',
  description: 'test description',
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString(),
  stages: Object.values(BaseStage),
  labels: Object.values(BaseLabel),
  roles: [roleMock],
  creatorId: 1,
};

export class WorkspaceResponseDto extends ResponseDto<IWorkspace> {
  @ApiProperty({ example: workspaceMock })
  data?: IWorkspace;
}
