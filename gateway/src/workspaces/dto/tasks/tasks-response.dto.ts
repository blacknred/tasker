import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from 'src/__shared__/dto/response.dto';
import { ITask } from '../../interfaces/task.interface';
import { taskMock } from './task-response.dto';

const taskPaginationMock = {
  hasMore: true,
  total: 100,
  items: [taskMock],
};

export class TasksResponseDto extends PaginatedResponseDto<ITask> {
  @ApiProperty({ example: taskPaginationMock })
  data: {
    hasMore: boolean;
    total: number;
    items: ITask[];
  };
}
