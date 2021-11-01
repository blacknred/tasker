import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Privilege } from '../interfaces/role.interface';

export class WorkspaceRoleDto {
  @MinLength(5, { message: 'Must include atleast 5 chars' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Must be a string' })
  description?: string;

  @IsOptional()
  @IsEnum(Privilege, {
    message: 'Must be one of the Privilege enum',
    each: true,
  })
  privileges?: Privilege[];
}

export class WorkspaceCreator {
  @IsNumber({}, { message: 'Must be an integer' })
  userId: number;

  @IsString({ message: 'Must be an string' })
  userName: string;
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
  @IsString({ message: 'Must be a string', each: true })
  stages?: string[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => WorkspaceRoleDto)
  roles?: WorkspaceRoleDto[];

  //

  @ValidateNested({ each: true })
  @Type(() => WorkspaceCreator)
  creator: WorkspaceCreator;
}
