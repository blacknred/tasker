import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BaseRole } from 'src/workspaces/interfaces/role.interface';
import { Agent } from 'src/__shared__/decorators/agent.decorator';
import { AccessGuard } from 'src/__shared__/guards/access.guard';
import { RoleGuard } from 'src/__shared__/guards/role.guard';
import { Roles } from '../__shared__/decorators/roles.decorator';
import { ResponseDto } from '../__shared__/dto/response.dto';
import { CreateSagaDto } from './dto/create-saga.dto';
import { GetSagaDto } from './dto/get-saga.dto';
import { GetSagasDto } from './dto/get-sagas.dto';
import { SagaResponseDto, SagasResponseDto } from './dto/response.dto';
import { UpdateSagaDto } from './dto/update-saga.dto';
import { SagasService } from './sagas.service';

@Controller('sagas')
export class SagasController {
  constructor(private readonly sagasService: SagasService) {}

  // Access, !CREATE_SAGA
  @MessagePattern('create')
  create(
    @Agent() agent,
    @Payload() createSagaDto: CreateSagaDto,
  ): Promise<SagaResponseDto> {
    return this.sagasService.create(createSagaDto, agent);
  }

  // Access, ?READ_ANY_SAGA | All Created
  @MessagePattern('getAll')
  getAll(
    @Agent() agent,
    @Payload() getSagasDto: GetSagasDto,
  ): Promise<SagasResponseDto> {
    return this.sagasService.findAll(getSagasDto, agent);
  }

  // Access, ?READ_ANY_SAGA | Creator
  @MessagePattern('getOne')
  getOne(
    @Agent() agent,
    @Payload() { id }: GetSagaDto,
  ): Promise<SagaResponseDto> {
    return this.sagasService.findOne(id, agent);
  }

  @UseGuards(AgentGuard)
  @MessagePattern('patch')
  update(@Payload() updateSagaDto: UpdateSagaDto): Promise<SagaResponseDto> {
    return this.sagasService.update(updateSagaDto.id, updateSagaDto);
  }

  @Roles(BaseRole.ADMIN)
  @UseGuards(RoleGuard)
  @MessagePattern('delete')
  remove(@Payload() { id, userId }: GetSagaDto): Promise<ResponseDto> {
    return this.sagasService.remove(id, userId);
  }
}
