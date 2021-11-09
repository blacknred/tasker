import { IntersectionType, OmitType, PartialType } from '@nestjs/mapped-types';
import { IsIn, IsOptional } from 'class-validator';
import {
  AccessDto,
  PaginationDto,
  SortingDto,
} from '../../__shared__/dto/request.dto';
import { CreateRoleDto } from './create-role.dto';

class RolesSortingDto extends SortingDto {
  @IsOptional()
  @IsIn(['name'], {
    message: 'Must be a one of fields of the Role entity',
  })
  'sort.field'?: 'name';
}

export class GetRolesDto extends IntersectionType(
  PartialType(OmitType(CreateRoleDto, ['privileges'])),
  AccessDto,
  PaginationDto,
  RolesSortingDto,
) {}
