import { Optional } from '@nestjs/common';
import { IsMongoId, IsNumber } from 'class-validator';
import { ObjectID } from 'typeorm';

export class GetWorkspaceDto {
  @IsMongoId({ message: 'Invalid identificator' })
  id: ObjectID;

  @Optional()
  @IsNumber({}, { message: 'Must be an integer' })
  userId?: number;
}
