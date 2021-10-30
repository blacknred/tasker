import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SagasService } from './sagas.service';

@Controller('sagas')
export class SagasController {
  constructor(private readonly sagasService: SagasService) {}

  @MessagePattern('create')
  create(@Payload() createSagaDto: CreateSagaDto): Promise<SagaResponseDto> {
    return this.sagasService.create(createSagaDto);
  }

  @MessagePattern('getAll')
  getAll(@Payload() getSagasDto: GetSagasDto): Promise<SagasResponseDto> {
    return this.sagasService.findAll(getSagasDto);
  }

  @MessagePattern('getOne')
  getOne(@Payload() { id, userId }: GetSagaDto): Promise<SagaResponseDto> {
    return this.sagasService.findOne(id, userId);
  }

  @MessagePattern('patch')
  update(@Payload() updateSagaDto: UpdateSagaDto): Promise<SagaResponseDto> {
    return this.sagasService.update(updateSagaDto.id, updateSagaDto);
  }

  @MessagePattern('delete')
  remove(@Payload() { id, userId }: GetSagaDto): Promise<ResponseDto> {
    return this.sagasService.remove(id, userId);
  }
}
