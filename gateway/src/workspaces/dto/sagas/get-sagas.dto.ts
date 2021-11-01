import { IntersectionType, PartialType } from '@nestjs/swagger';
import { PaginationDto } from 'src/__shared__/dto/request.dto';
import { CreateSagaDto } from './create-saga.dto';

export class GetSagasDto extends IntersectionType(
  PartialType(CreateSagaDto),
  PaginationDto,
) {}
