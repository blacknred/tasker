import { ApiProperty } from '@nestjs/swagger';
import { IAgent } from 'src/workspaces/interfaces/agent.interface';
import { PaginatedResponseDto } from 'src/__shared__/dto/response.dto';
import { agentMock } from './agent-response.dto';

const agentPaginationMock = {
  hasMore: true,
  total: 100,
  items: [agentMock],
};

export class AgentsResponseDto extends PaginatedResponseDto<IAgent> {
  @ApiProperty({ example: agentPaginationMock })
  data: {
    hasMore: boolean;
    total: number;
    items: IAgent[];
  };
}
