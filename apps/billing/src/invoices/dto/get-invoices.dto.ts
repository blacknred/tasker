import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsIn, IsOptional } from 'class-validator';
import {
  AccessDto,
  PaginationDto,
  SortingDto,
} from '../../__shared__/dto/request.dto';
import { CreateAgentDto } from './create-invoice.dto';

class AgentsSortingDto extends SortingDto {
  @IsOptional()
  @IsIn(['userId', 'name', 'role', 'createdAt'], {
    message: 'Must be a one of fields of the Agent entity',
  })
  'sort.field'?: 'userId' | 'name' | 'role' | 'createdAt';
}

export class GetAgentsDto extends IntersectionType(
  PartialType(CreateAgentDto),
  AccessDto,
  PaginationDto,
  AgentsSortingDto,
) {
  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  createdAt?: string;
}
