import { ApiProperty } from '@nestjs/swagger';
import { BaseLabel, BaseStage } from 'src/workspaces/interfaces/task.interface';

export class CreateTaskDto {
  @ApiProperty({ example: 'testtask' })
  name: string;

  @ApiProperty({ example: 'test description', required: false })
  description?: string;

  @ApiProperty({ example: new Date().toDateString(), required: false })
  expiresAt?: string;

  @ApiProperty({ example: BaseStage.TODO })
  stage: string;

  @ApiProperty({ example: BaseLabel.ROUTINE, required: false })
  label?: string;

  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb', required: false })
  assigneeId?: string;

  @ApiProperty({
    example: ['5r185c3vfb991ee66b486ccb'],
    isArray: true,
    required: false,
  })
  sagaIds?: string[];
}
