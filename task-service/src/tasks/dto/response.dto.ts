import { HttpStatus } from '@nestjs/common';
import { ITask } from '../interfaces/task.interface';

export class ValidationError {
  field: string;
  message: string;
}

export class Pagination<T> {
  hasMore: boolean;
  total: number;
  items: T[];
}

export class ResponseDto<T = null> {
  status: HttpStatus;
  errors?: ValidationError[];
  data?: T;
}

export class TaskResponseDto extends ResponseDto<ITask> {}

export class TasksResponseDto extends ResponseDto<Pagination<ITask>> {}
