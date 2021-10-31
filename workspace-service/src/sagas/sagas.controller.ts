import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BaseRole } from 'src/workspaces/interfaces/role.interface';
import { AgentGuard } from 'src/__shared__/guards/agent.guard';
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

  @Roles(BaseRole.ADMIN)
  @UseGuards(RoleGuard)
  @MessagePattern('create')
  create(@Payload() createSagaDto: CreateSagaDto): Promise<SagaResponseDto> {
    return this.sagasService.create(createSagaDto);
  }

  @UseGuards(AgentGuard)
  @MessagePattern('getAll')
  getAll(@Payload() getSagasDto: GetSagasDto): Promise<SagasResponseDto> {
    return this.sagasService.findAll(getSagasDto);
  }

  @UseGuards(AgentGuard)
  @MessagePattern('getOne')
  getOne(@Payload() { id, userId }: GetSagaDto): Promise<SagaResponseDto> {
    return this.sagasService.findOne(id, userId);
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
