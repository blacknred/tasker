import { IntersectionType, PartialType } from '@nestjs/swagger';
import { PaginatedRequestDto } from 'src/__shared__/dto/request.dto';
import { CreateTaskDto } from './create-task.dto';

export class GetTasksDto extends IntersectionType(
  PaginatedRequestDto,
  PartialType(CreateTaskDto),
) {}
