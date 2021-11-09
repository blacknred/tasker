import { ApiProperty } from '@nestjs/swagger';

export class CreateAgentDto {
  @ApiProperty({ example: 1, nullable: false })
  userId: number;

  @ApiProperty({ example: 'testagent', nullable: false })
  name: string;

  @ApiProperty({ example: 'testavatarurl', nullable: false })
  image?: string;

  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb', nullable: false })
  roleId?: string;
}
