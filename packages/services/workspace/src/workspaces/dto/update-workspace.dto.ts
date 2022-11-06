import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  IsEnum,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Privilege } from '../interfaces/workspace.interface';
import { CreateWorkspaceDto } from './create-workspace.dto';

export class RoleDto {
  @MinLength(5, { message: 'Must include atleast 5 chars' })
  @MaxLength(100, { message: 'Must include no more than 100 chars' })
  name: string;

  @IsOptional()
  @IsArray({ message: 'Must be an array' })
  @IsEnum(Privilege, {
    message: 'Must includes a Privilege enum',
    each: true,
  })
  privileges?: Privilege[];
}

export class UpdateWorkspaceDto extends PartialType(
  OmitType(CreateWorkspaceDto, ['creator']),
) {
  @IsMongoId({ message: 'Invalid identificator' })
  id: string;

  @IsOptional()
  @IsArray({ message: 'Must be an array' })
  @IsString({ message: 'Must includes a strings', each: true })
  stages?: string[];

  @IsOptional()
  @IsArray({ message: 'Must be an array' })
  @IsString({ message: 'Must includes a strings', each: true })
  labels?: string[];

  @IsOptional()
  @IsArray({ message: 'Must be an array' })
  @ValidateNested({ each: true })
  roles?: RoleDto[];

  //

  @IsNumber({}, { message: 'Must be an integer' })
  uid: number;
}
