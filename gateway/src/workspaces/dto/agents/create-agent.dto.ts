import { ApiProperty } from '@nestjs/swagger';

export class CreateAgentDto {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'testagent' })
  name: string;

  @ApiProperty({ example: 'testavatarurl', required: false })
  image?: string;

  @ApiProperty({ example: 'WORKER', required: false })
  role?: string;
}
