import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IAgent } from 'src/agents/interfaces/agent.interface';
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
  @Type(() => AgentD)
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
