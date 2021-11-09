import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { PaginationDto } from 'src/__shared__/dto/request.dto';
import { CreateTaskDto } from './create-task.dto';

export class GetTasksDto extends IntersectionType(
  PartialType(OmitType(CreateTaskDto, ['description', 'sagaIds'])),
  PaginationDto,
) {
  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb', required: false })
  creatorId?: string;

  @ApiProperty({ example: new Date().toDateString(), required: false })
  createdAt?: string;

  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb', required: false })
  sagaId?: string;
}
