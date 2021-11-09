import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Privilege } from 'src/workspaces/interfaces/workspace.interface';
import { Agent } from 'src/__shared__/decorators/agent.decorator';
import { WithPrivilege } from 'src/__shared__/decorators/with-privilege.decorator';
import { AgentGuard } from 'src/__shared__/guards/agent.guard';
import { ResponseDto } from '../__shared__/dto/response.dto';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { GetAgentDto } from './dto/get-agent.dto';
import { GetAgentsDto } from './dto/get-agents.dto';
import { AgentResponseDto, AgentsResponseDto } from './dto/response.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Controller()
@UseGuards(AgentGuard)
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @WithPrivilege(Privilege.CREATE_AGENT)
  @MessagePattern('agents/create')
  async create(
    @Agent() agent,
    @Payload() createAgentDto: CreateAgentDto,
  ): Promise<AgentResponseDto> {
    return this.agentsService.create(createAgentDto, agent);
  }

  @MessagePattern('agents/getAll')
  async getAll(
    @Agent() agent,
    @Payload() getAgentsDto: GetAgentsDto,
  ): Promise<AgentsResponseDto> {
    return this.agentsService.findAll(getAgentsDto, agent);
  }

  @MessagePattern('agents/getOne')
  async getOne(
    @Agent() agent,
    @Payload() { id }: GetAgentDto,
  ): Promise<AgentResponseDto> {
    return this.agentsService.findOne(id, agent);
  }

  @MessagePattern('agents/update')
  async update(
    @Agent() agent,
    @Payload() updateAgentDto: UpdateAgentDto,
  ): Promise<AgentResponseDto> {
    return this.agentsService.update(updateAgentDto, agent);
  }

  @MessagePattern('agents/delete')
  async remove(
    @Agent() agent,
    @Payload() { id }: GetAgentDto,
  ): Promise<ResponseDto> {
    return this.agentsService.remove(id, agent);
  }
}
