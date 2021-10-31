import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class WorkspaceRoleDto {
  @MinLength(5, { message: 'Must include atleast 5 chars' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Must be a string' })
  description?: string;
}

export class WorkspaceStageDto {
  @MinLength(5, { message: 'Must include atleast 5 chars' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Must be a string' })
  description?: string;
}

export class CreateWorkspaceDto {
  @IsString({ message: 'Must be a string' })
  @MinLength(5, { message: 'Must include atleast 5 chars' })
  @MaxLength(200, { message: 'Must include no more than 200 chars' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Must be a string' })
  description?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => WorkspaceRoleDto)
  roles?: WorkspaceRoleDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => WorkspaceStageDto)
  stages?: WorkspaceStageDto[];

  @IsNumber({}, { message: 'Must be an integer' })
  userId: number;
}
