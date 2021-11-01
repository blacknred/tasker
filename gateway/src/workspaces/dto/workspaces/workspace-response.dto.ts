import { ApiProperty } from '@nestjs/swagger';
import { IAgent } from 'src/workspaces/interfaces/agent.interface';
import { IRole, Privilege } from 'src/workspaces/interfaces/role.interface';
import { IWorkspace } from 'src/workspaces/interfaces/workspace.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';

export const roleMock: IRole = {
  name: 'test role',
  description: 'test decription',
  privileges: [Privilege.READ_ANY_TASK],
};

export const agentMock: IAgent = {
  id: '5r185c3vfb991ee66b486ccb',
  userId: 1,
  userName: 'test name',
  role: roleMock,
  createdAt: new Date().toDateString(),
};

export const workspaceMock: IWorkspace = {
  id: '5r185c3vfb991ee66b486ccb',
  name: 'first task',
  description: 'test task description',
  creatorId: 1,
  labels: ['TODO', 'DONE'],
  roles: [roleMock],
  agents: [agentMock],
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString(),
};

export class WorkspaceResponseDto extends ResponseDto<IWorkspace> {
  @ApiProperty({ example: workspaceMock, nullable: true })
  data?: IWorkspace;
}
