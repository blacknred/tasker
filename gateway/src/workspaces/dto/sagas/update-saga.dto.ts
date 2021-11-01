import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSagaDto } from './create-saga.dto';

export class UpdateSagaDto extends PartialType(CreateSagaDto) {
  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb', nullable: false })
  id: string;
}
