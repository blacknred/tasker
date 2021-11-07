import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types';
import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { AccessDto } from 'src/__shared__/dto/request.dto';
import { CreateWorkspaceDto } from './create-workspace.dto';

export class UpdateWorkspaceDto extends IntersectionType(
  PartialType(PickType(CreateWorkspaceDto, ['name', 'description'])),
  AccessDto,
) {
  @IsMongoId({ message: 'Invalid identificator' })
  id: string;

  @IsOptional()
  @IsString({ message: 'Must be a string', each: true })
  taskStages?: string[];

  @IsOptional()
  @IsString({ message: 'Must be a string', each: true })
  taskLabels?: string[];

  @IsString({ message: 'Must be a string' })
  doneStage?: string;

  //

  @IsNumber({}, { message: 'Must be an integer' })
  uid: number;
}
