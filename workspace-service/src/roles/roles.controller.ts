import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Agent } from 'src/__shared__/decorators/agent.decorator';
import { WithPrivilege } from 'src/__shared__/decorators/with-privilege.decorator';
import { AgentGuard } from 'src/__shared__/guards/agent.guard';
import { ResponseDto } from '../__shared__/dto/response.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { GetRoleDto } from './dto/get-role.dto';
import { GetRolesDto } from './dto/get-roles.dto';
import { RoleResponseDto, RolesResponseDto } from './dto/response.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Privilege } from './interfaces/role.interface';
import { RolesService } from './roles.service';

@Controller()
@UseGuards(AgentGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @WithPrivilege(Privilege.MANAGE_ROLE)
  @MessagePattern('roles/create')
  async create(
    @Payload() createRoleDto: CreateRoleDto,
  ): Promise<RoleResponseDto> {
    return this.rolesService.create(createRoleDto);
  }

  @MessagePattern('roles/getAll')
  async getAll(@Payload() getRolesDto: GetRolesDto): Promise<RolesResponseDto> {
    return this.rolesService.findAll(getRolesDto);
  }

  @WithPrivilege(Privilege.MANAGE_ROLE)
  @MessagePattern('roles/getOne')
  async getOne(@Payload() { id }: GetRoleDto): Promise<RoleResponseDto> {
    return this.rolesService.findOne(id);
  }

  @WithPrivilege(Privilege.MANAGE_ROLE)
  @MessagePattern('roles/update')
  async update(
    @Agent() agent,
    @Payload() updateRoleDto: UpdateRoleDto,
  ): Promise<RoleResponseDto> {
    return this.rolesService.update(updateRoleDto, agent);
  }

  @WithPrivilege(Privilege.MANAGE_ROLE)
  @MessagePattern('roles/delete')
  async remove(
    @Agent() agent,
    @Payload() { id }: GetRoleDto,
  ): Promise<ResponseDto> {
    return this.rolesService.remove(id, agent);
  }
}
