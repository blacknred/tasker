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
  OmitType(CreateWorkspaceDto, ['userName', 'userImage']),
) {
  @IsMongoId({ message: 'Invalid identificator' })
  id: string;

  @IsOptional()
  @IsString({ message: 'Must be a string', each: true })
  taskStages?: string[];

  @IsOptional()
  @IsArray({ each: true })
  @IsString({ message: 'Must be a string', each: true })
  taskLabels?: string[];

  @IsOptional()
  @IsString({ message: 'Must be a string' })
  doneStage?: string;

  //

  @IsNumber({}, { message: 'Must be an integer' })
  uid: number;
}
