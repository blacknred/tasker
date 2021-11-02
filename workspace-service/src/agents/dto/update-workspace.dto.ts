import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectID } from 'typeorm';
import { CreateWorkspaceDto, WorkspaceRoleDto } from './create-workspace.dto';

export class WorkspaceAgentDto {
  @IsNumber({}, { message: 'Must be an integer' })
  userId: number;

  @IsString({ message: 'Must be a string' })
  userName: string;

  @ValidateNested()
  @Type(() => WorkspaceRoleDto)
  role: WorkspaceRoleDto;
}

export class UpdateWorkspaceDto extends PartialType(CreateWorkspaceDto) {
  @IsMongoId({ message: 'Invalid identificator' })
  id: ObjectID;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => WorkspaceAgentDto)
  agents?: WorkspaceAgentDto[];

  //

  @IsNumber({}, { message: 'Must be an integer' })
  userId: number;
}
