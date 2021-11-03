import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ITaskHistoryUpdate } from 'src/workspaces/interfaces/task.interface';
import { CreateTaskDto } from './create-task.dto';
import { historyUpdateMock } from './task-response.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb', nullable: false })
  id: string;

  @ApiProperty({ example: historyUpdateMock })
  historyUpdate?: ITaskHistoryUpdate;
}
