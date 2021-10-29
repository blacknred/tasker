import { PartialType } from '@nestjs/mapped-types';
import { ObjectID } from 'typeorm';
import { CreateWorkspaceDto } from './create-workspace.dto';
import { IsMongoId } from 'class-validator';

export class UpdateWorkspaceDto extends PartialType(CreateWorkspaceDto) {
  @IsMongoId({ message: 'Invalid identificator' })
  id: ObjectID;
}
