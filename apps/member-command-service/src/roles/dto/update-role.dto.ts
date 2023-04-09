import { PartialType } from '@nestjs/mapped-types';
import { OmitType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(
  OmitType(CreateRoleDto, ['projectId']),
) {}
