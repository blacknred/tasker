import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '@taskapp/shared';
import {
  IsArray,
  IsEnum,
  IsHexColor,
  IsOptional,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  projectId: string;

  @ApiProperty({ type: 'string', example: 'Developer' })
  @Length(5, 30, { message: 'Must have from 5 to 30 chars' })
  name: string;

  @ApiProperty({ type: 'hex color', example: '#333333' })
  @IsOptional()
  @IsHexColor({ message: 'Non valid hex color' })
  color?: string;

  @ApiProperty({
    enum: Permission,
    example: [Permission.STORY_MANAGEMENT, Permission.TASK_MANAGEMENT],
    isArray: true,
  })
  @IsArray({ message: 'Must be an array' })
  @IsEnum(Permission, {
    message: `Must be a one of the fields: ${Object.keys(Permission).join(
      ', ',
    )}`,
    each: true,
  })
  permissions: Permission[];
}
