import { ApiProperty } from '@nestjs/swagger';
import {
  BaseLabel,
  BaseStage,
} from 'src/workspaces/interfaces/workspace.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { ITask, ITaskUpdate } from '../../interfaces/task.interface';
import { agentMock } from '../agents/agent-response.dto';
import { sagaMock } from '../sagas/saga-response.dto';

export const taskUpdateMock: ITaskUpdate = {
  agent: agentMock,
  createdAt: new Date().toDateString(),
  state: {
    field: 'name',
    next: 'nexttaskname',
    prev: 'taskname',
  },
};

export const taskMock: ITask = {
  id: '5r185c3vfb991ee66b486ccb',
  name: 'testtask',
  description: 'test description',
  stage: BaseStage.TODO,
  label: BaseLabel.ROUTINE,
  assignee: agentMock,
  creator: agentMock,
  sagas: [sagaMock],
  updates: [taskUpdateMock],
  createdAt: new Date().toDateString(),
  workspaceId: '5r185c3vfb991ee66b486ccb',
};

export class TaskResponseDto extends ResponseDto<ITask> {
  @ApiProperty({ example: taskMock })
  data?: ITask;
}
