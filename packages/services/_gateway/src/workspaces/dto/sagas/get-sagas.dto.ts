import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { PaginationDto } from 'src/__shared__/dto/request.dto';
import { CreateSagaDto } from './create-saga.dto';

export class GetSagasDto extends IntersectionType(
  PartialType(OmitType(CreateSagaDto, ['description'])),
  PaginationDto,
) {
  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb', required: false })
  creatorId?: string;

  @ApiProperty({ example: new Date().toDateString(), required: false })
  createdAt?: string;
}
