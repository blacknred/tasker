import { ApiProperty } from '@nestjs/swagger';
import { IRole, Privilege } from 'src/workspaces/interfaces/role.interface';
import { IWorkspace } from 'src/workspaces/interfaces/workspace.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { agentMock } from '../agents/agent-response.dto';

export const roleMock: IRole = {
  id: '5r185c3vfb991ee66b486ccb',
  name: 'test role',
  privileges: [Privilege.READ_ANY_TASK],
};

export const workspaceMock: IWorkspace = {
  id: '5r185c3vfb991ee66b486ccb',
  name: 'first task',
  description: 'test task description',
  creatorId: 1,
  labels: ['TODO', 'DONE'],
  roles: [roleMock],
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString(),
  agent: agentMock,
};

export class WorkspaceResponseDto extends ResponseDto<IWorkspace> {
  @ApiProperty({ example: workspaceMock, nullable: true })
  data?: IWorkspace;
}
