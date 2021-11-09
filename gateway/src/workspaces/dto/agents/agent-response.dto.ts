import { ApiProperty } from '@nestjs/swagger';
import { IAgent } from 'src/workspaces/interfaces/agent.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { roleMock } from '../roles/role-response.dto';

export const agentMock: IAgent = {
  id: '5r185c3vfb991ee66b486ccb',
  userId: 1,
  name: 'testagent',
  image: 'testavatarurl',
  createdAt: new Date().toDateString(),
  role: roleMock,
};

export class AgentResponseDto extends ResponseDto<IAgent> {
  @ApiProperty({ example: agentMock })
  data?: IAgent;
}
