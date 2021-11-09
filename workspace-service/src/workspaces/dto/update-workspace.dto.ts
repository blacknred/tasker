import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';
import { CreateWorkspaceDto } from './create-workspace.dto';

export class UpdateWorkspaceDto extends PartialType(
  OmitType(CreateWorkspaceDto, ['userId', 'userName', 'userImage']),
) {
  @IsMongoId({ message: 'Invalid identificator' })
  id: string;

  @IsOptional()
  @IsArray({ message: 'Must be an array' })
  @IsString({ message: 'Must includes a strings', each: true })
  taskStages?: string[];

  @IsOptional()
  @IsArray({ message: 'Must be an array' })
  @IsString({ message: 'Must includes a strings', each: true })
  taskLabels?: string[];

  @IsOptional()
  @IsString({ message: 'Must be a string' })
  doneStage?: string;

  //

  @IsNumber({}, { message: 'Must be an integer' })
  uid: number;
}
