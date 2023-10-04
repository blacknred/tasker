import { ApiProperty } from '@nestjs/swagger';
import { WorkspacePolicy, roleMock } from '@taskapp/shared';
import {
  IsArray,
  IsEnum,
  IsHexColor,
  IsNumber,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ type: 'string', example: roleMock.name })
  @Length(1, 10, { message: 'Must have from 1 to 10 chars' })
  readonly name: string;

  @ApiProperty({
    type: 'string',
    example: roleMock.details,
    required: false,
  })
  @IsOptional()
  @Length(1, 100, { message: 'Must have from 1 to 100 chars' })
  readonly details?: string;

  @ApiProperty({ type: 'string', example: roleMock.color, required: false })
  @IsOptional()
  @IsHexColor()
  readonly color?: string;

  @ApiProperty({ type: 'number', example: roleMock.rank })
  @IsNumber()
  readonly rank: number;

  @ApiProperty({
    enum: WorkspacePolicy,
    example: roleMock.policies,
    isArray: true,
  })
  @IsArray({ message: 'Must be an array' })
  @IsEnum(WorkspacePolicy, {
    message: `Must be a one of the fields: ${Object.keys(WorkspacePolicy).join(
      ', ',
    )}`,
  })
  policies: WorkspacePolicy[];
}
