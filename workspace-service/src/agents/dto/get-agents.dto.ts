import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsIn, IsOptional } from 'class-validator';
import {
  AccessDto,
  PaginationDto,
  SortingDto,
} from '../../__shared__/dto/request.dto';
import { CreateAgentDto } from './create-agent.dto';

class WorkspaceSortingDto extends SortingDto {
  @IsOptional()
  @IsIn(['createdAt'], {
    message: 'Must be a one of fields of the Agent entity',
  })
  'sort.field'?: 'createdAt';
}

export class GetAgentsDto extends IntersectionType(
  PartialType(CreateAgentDto),
  AccessDto,
  PaginationDto,
  WorkspaceSortingDto,
) {
  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  createdAt?: string;
}
