import {
  PaginatedResponseDto,
  ResponseDto,
} from 'src/__shared__/dto/response.dto';
import { ITask } from '../interfaces/task.interface';

export class TaskResponseDto extends ResponseDto<ITask> {}

export class TasksResponseDto extends PaginatedResponseDto<ITask> {}
