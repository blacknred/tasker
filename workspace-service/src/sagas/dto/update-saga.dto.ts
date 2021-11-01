import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { AccessDto } from 'src/__shared__/dto/request.dto';
import { ObjectID } from 'typeorm';
import { CreateSagaDto } from './create-saga.dto';

export class UpdateSagaDto extends IntersectionType(
  PartialType(CreateSagaDto),
  AccessDto,
) {
  @IsMongoId({ message: 'Invalid identificator' })
  id: ObjectID;
}
