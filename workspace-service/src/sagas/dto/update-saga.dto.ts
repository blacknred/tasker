import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { ObjectID } from 'typeorm';
import { CreateSagaDto } from './create-saga.dto';

export class UpdateSagaDto extends PartialType(CreateSagaDto) {
  @IsMongoId({ message: 'Invalid identificator' })
  id: ObjectID;
}
