import { ApiProperty } from '@nestjs/swagger';

export class GetTaskDto {
  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb' })
  id: string;

  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb' })
  taskId: string;
}
