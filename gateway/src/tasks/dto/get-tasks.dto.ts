import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

export class GetTasksDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    required: false,
    example: 20,
    nullable: false,
  })
  limit: number;
  @ApiProperty({
    required: false,
    example: 1,
  })
  page: number;
}
