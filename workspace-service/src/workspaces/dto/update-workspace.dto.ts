import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNumber } from 'class-validator';
import { ObjectID } from 'typeorm';
import { CreateWorkspaceDto } from './create-workspace.dto';

export class UpdateWorkspaceDto extends PartialType(
  OmitType(CreateWorkspaceDto, ['userId', 'userName']),
) {
  @IsMongoId({ message: 'Invalid identificator' })
  id: ObjectID;

  @IsNumber({}, { message: 'Must be an integer' })
  uid: number;
}
