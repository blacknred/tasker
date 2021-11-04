import { IntersectionType, PartialType } from '@nestjs/swagger';
import { PaginationDto } from 'src/__shared__/dto/request.dto';
import { CreateRoleDto } from './create-role.dto';

export class GetRolesDto extends IntersectionType(
  PartialType(CreateRoleDto),
  PaginationDto,
) {}
