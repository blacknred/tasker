import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { ITask, TaskPriority, TaskType } from '../../interfaces/task.interface';
import { agentMock } from '../workspaces/workspace-response.dto';

export const taskMock: ITask = {
  id: '5r185c3vfb991ee66b486ccb',
  name: 'first task',
  description: 'test task description',
  type: TaskType.SHORT,
  priority: TaskPriority.LOW,
  creator: agentMock,
  workspaceId: '5r185c3vfb991ee66b486ccb',
  sagaIds: ['5r185c3vfb991ee66b486ccb'],
  history: [
    {
      agent: agentMock,
      createdAt: new Date().toDateString(),
      label: 'TODO',
    },
  ],
  createdAt: new Date().toDateString(),
};

export class TaskResponseDto extends ResponseDto<ITask> {
  @ApiProperty({ example: taskMock, nullable: true })
  data?: ITask;
}
