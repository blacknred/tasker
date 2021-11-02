import { ApiProperty } from '@nestjs/swagger';
import { ISaga } from 'src/workspaces/interfaces/saga.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { agentMock } from '../agents/agent-response.dto';

export const sagaMock: ISaga = {
  id: '5r185c3vfb991ee66b486ccb',
  name: 'testsaga',
  description: 'test description',
  creator: agentMock,
  workspaceId: '5r185c3vfb991ee66b486ccb',
  createdAt: new Date().toDateString(),
  expiresAt: new Date().toDateString(),
};

export class SagaResponseDto extends ResponseDto<ISaga> {
  @ApiProperty({ example: sagaMock, nullable: true })
  data?: ISaga;
}
