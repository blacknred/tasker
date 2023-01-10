import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateProjectRoleDto } from './create-project-role.dto';

export class UpdateProjectRoleDto extends PartialType(
  OmitType(CreateProjectRoleDto, ['projectId']),
) {
  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  id: string;
}
