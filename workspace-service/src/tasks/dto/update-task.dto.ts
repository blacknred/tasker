import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { WorkspaceAgentDto } from 'src/workspaces/dto/update-workspace.dto';
import { IAgent } from 'src/workspaces/interfaces/agent.interface';
import { AccessDto } from 'src/__shared__/dto/request.dto';
import { ObjectID } from 'typeorm';
import { ITaskHistoryUpdate } from '../interfaces/task.interface';
import { CreateTaskDto } from './create-task.dto';

export class TaskHistoryUpdateDto {
  @IsOptional()
  @IsString({ message: 'Must be an integer' })
  label?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => WorkspaceAgentDto)
  agent?: IAgent;
}

export class UpdateTaskDto extends IntersectionType(
  PartialType(CreateTaskDto),
  AccessDto,
) {
  @IsMongoId({ message: 'Invalid identificator' })
  id: ObjectID;

  @IsOptional()
  @ValidateNested()
  @Type(() => TaskHistoryUpdateDto)
  historyUpdate?: ITaskHistoryUpdate;
}
