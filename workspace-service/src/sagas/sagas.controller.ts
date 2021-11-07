import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Privilege } from 'src/roles/interfaces/role.interface';
import { Agent } from 'src/__shared__/decorators/agent.decorator';
import { WithPrivilege } from 'src/__shared__/decorators/with-privilege.decorator';
import { AgentGuard } from 'src/__shared__/guards/agent.guard';
import { ResponseDto } from '../__shared__/dto/response.dto';
import { CreateSagaDto } from './dto/create-saga.dto';
import { GetSagaDto } from './dto/get-saga.dto';
import { GetSagasDto } from './dto/get-sagas.dto';
import { SagaResponseDto, SagasResponseDto } from './dto/response.dto';
import { UpdateSagaDto } from './dto/update-saga.dto';
import { SagasService } from './sagas.service';

@Controller()
@UseGuards(AgentGuard)
export class SagasController {
  constructor(private readonly sagasService: SagasService) {}

  @WithPrivilege(Privilege.CREATE_SAGA)
  @MessagePattern('sagas/create')
  async create(
    @Agent() agent,
    @Payload() createSagaDto: CreateSagaDto,
  ): Promise<SagaResponseDto> {
    return this.sagasService.create(createSagaDto, agent);
  }

  @MessagePattern('sagas/getAll')
  async getAll(
    @Agent() agent,
    @Payload() getSagasDto: GetSagasDto,
  ): Promise<SagasResponseDto> {
    return this.sagasService.findAll(getSagasDto, agent);
  }

  @MessagePattern('sagas/getOne')
  async getOne(
    @Agent() agent,
    @Payload() { id }: GetSagaDto,
  ): Promise<SagaResponseDto> {
    return this.sagasService.findOne(id, agent);
  }

  @MessagePattern('sagas/update')
  async update(
    @Agent() agent,
    @Payload() updateSagaDto: UpdateSagaDto,
  ): Promise<SagaResponseDto> {
    return this.sagasService.update(updateSagaDto, agent);
  }

  @MessagePattern('sagas/delete')
  async remove(
    @Agent() agent,
    @Payload() { id }: GetSagaDto,
  ): Promise<ResponseDto> {
    return this.sagasService.remove(id, agent);
  }
}
