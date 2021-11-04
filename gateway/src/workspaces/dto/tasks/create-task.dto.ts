import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'testtask', nullable: false })
  name: string;

  @ApiProperty({ example: 'test description' })
  description?: string;

  @ApiProperty({ example: '123234123424' })
  expiresAt?: string;

  @ApiProperty({ example: 'TODO', nullable: false })
  stage: string;

  @ApiProperty({ example: 'CRITICAL' })
  label?: string;

  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb' })
  assigneeId?: string;

  @ApiProperty({ example: ['5r185c3vfb991ee66b486ccb'], isArray: true })
  sagaIds?: string;
}
