import { ApiProperty } from '@nestjs/swagger';
import { IAgent } from 'src/workspaces/interfaces/agent.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { roleMock } from '../workspaces/workspace-response.dto';

export const agentMock: IAgent = {
  id: '5r185c3vfb991ee66b486ccb',
  userId: 1,
  userName: 'test name',
  role: roleMock,
  workspaceId: '5r185c3vfb991ee66b486ccb',
  createdAt: new Date().toDateString(),
};

export class AgentResponseDto extends ResponseDto<IAgent> {
  @ApiProperty({ example: agentMock, nullable: true })
  data?: IAgent;
}
