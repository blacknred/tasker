import { ApiProperty } from '@nestjs/swagger';
import {
  BaseLabel,
  BaseStage,
  IWorkspace,
} from 'src/workspaces/interfaces/workspace.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { agentMock } from '../agents/agent-response.dto';

export const workspaceMock: IWorkspace = {
  id: '5r185c3vfb991ee66b486ccb',
  name: 'testworkspace',
  description: 'test description',
  taskStages: Object.values(BaseStage),
  taskLabels: Object.values(BaseLabel),
  doneStage: BaseStage.TODO,
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString(),
  creatorId: 1,
  //
  agent: agentMock,
};

export class WorkspaceResponseDto extends ResponseDto<IWorkspace> {
  @ApiProperty({ example: workspaceMock })
  data?: IWorkspace;
}
