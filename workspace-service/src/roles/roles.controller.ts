import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Privilege } from 'src/roles/role.interface';
import { Agent } from 'src/__shared__/decorators/agent.decorator';
import { WithPrivilege } from 'src/__shared__/decorators/with-privilege.decorator';
import { AgentGuard } from 'src/__shared__/guards/agent.guard';
import { ResponseDto } from '../__shared__/dto/response.dto';
import { RolesService } from './roles.service';
import { CreateAgentDto } from './dto/create-role.dto';
import { GetAgentDto } from './dto/get-role.dto';
import { GetAgentsDto } from './dto/get-roles.dto';
import { AgentResponseDto, AgentsResponseDto } from './dto/response.dto';
import { UpdateAgentDto } from './dto/update-role.dto';

@Controller()
@UseGuards(AgentGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @WithPrivilege(Privilege.CREATE_AGENT)
  @MessagePattern('create')
  async create(
    @Payload() createAgentDto: CreateAgentDto,
  ): Promise<AgentResponseDto> {
    return this.rolesService.create(createAgentDto);
  }

  @MessagePattern('getAll')
  async getAll(
    @Payload() getAgentsDto: GetAgentsDto,
  ): Promise<AgentsResponseDto> {
    return this.rolesService.findAll(getAgentsDto);
  }

  @MessagePattern('getOne')
  async getOne(
    @Agent() agent,
    @Payload() { id }: GetAgentDto,
  ): Promise<AgentResponseDto> {
    return this.rolesService.findOne(id, agent);
  }

  @MessagePattern('update')
  async update(
    @Agent() agent,
    @Payload() updateAgentDto: UpdateAgentDto,
  ): Promise<AgentResponseDto> {
    return this.rolesService.update(updateAgentDto, agent);
  }

  @MessagePattern('delete')
  async remove(
    @Agent() agent,
    @Payload() { id }: GetAgentDto,
  ): Promise<ResponseDto> {
    return this.rolesService.remove(id, agent);
  }
}
