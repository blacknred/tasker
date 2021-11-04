import { IntersectionType, OmitType, PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { AccessDto } from 'src/__shared__/dto/request.dto';
import { ObjectID } from 'typeorm';
import { CreateWorkspaceDto } from './create-workspace.dto';

export class UpdateWorkspaceDto extends IntersectionType(
  PartialType(OmitType(CreateWorkspaceDto, ['userId', 'userName'])),
  AccessDto,
) {
  @IsMongoId({ message: 'Invalid identificator' })
  id: ObjectID;

  @IsOptional()
  @IsString({ message: 'Must be a string', each: true })
  taskStages?: string[];

  @IsOptional()
  @IsString({ message: 'Must be a string', each: true })
  taskLabels?: string[];

  @IsString({ message: 'Must be a string' })
  doneStage?: string;

  //

  @IsNumber({}, { message: 'Must be an integer' })
  uid: number;
}
