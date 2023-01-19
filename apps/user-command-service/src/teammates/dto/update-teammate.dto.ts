import { PartialType, PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateTeammateDto } from './create-teammate.dto';

export class UpdateTeammateDto extends PartialType(
  PickType(CreateTeammateDto, ['roleId']),
) {
  @ApiProperty({ type: 'boolean', example: false, required: false })
  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  isActive: boolean;
}
