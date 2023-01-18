import {
  PaginatedResponseDto,
  ResponseDto,
} from '../../__shared__/dto/response.dto';
import { IAgent } from '../interfaces/agent.interface';

export class AgentResponseDto extends ResponseDto<IAgent> {}

export class AgentsResponseDto extends PaginatedResponseDto<IAgent> {}
