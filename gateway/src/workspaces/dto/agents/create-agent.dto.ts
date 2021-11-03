import { ApiProperty } from '@nestjs/swagger';

export class CreateAgentDto {
  @ApiProperty({ example: 1, nullable: false })
  userId: number;

  @ApiProperty({ example: 'testname', nullable: false })
  userName: string;

  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb', nullable: false })
  roleId: string;
}
