import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { PaginationDto } from 'src/__shared__/dto/request.dto';
import { CreateTaskDto } from './create-task.dto';

export class GetTasksDto extends IntersectionType(
  PartialType(CreateTaskDto),
  PaginationDto,
) {
  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb' })
  creatorId: string;

  @ApiProperty({ example: '4345345345235234' })
  createdAt?: string;

  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb' })
  sagaId: string;
}
