import { ApiProperty } from '@nestjs/swagger';

export class GetTaskDto {
  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb', nullable: false })
  id: string;

  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb', nullable: false })
  taskId: string;
}
