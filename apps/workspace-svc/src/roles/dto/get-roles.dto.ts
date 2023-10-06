import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { PaginatedRequestDto, Policy, roleMock } from '@taskapp/shared';
import { IsEnum, IsIn, IsOptional, Length } from 'class-validator';

export class GetRolesDto extends OmitType(PaginatedRequestDto, ['sort.field']) {
  @ApiProperty({ type: 'string', example: 'createdAt', required: false })
  @IsOptional()
  @IsIn(['name', 'rank', 'createdAt'], {
    message: 'Must be a one of the fields: name, rank, createdAt',
  })
  readonly 'sort.field'?: 'name' | 'rank' | 'createdAt';

  @ApiProperty({ type: 'string', example: roleMock.name, required: false })
  @IsOptional()
  @Length(0, 100, { message: 'Must have up to 100 chars' })
  readonly name?: string;

  @ApiProperty({
    enum: Policy,
    example: roleMock.policies[0],
    required: false,
  })
  @IsOptional()
  @IsEnum(Policy, {
    message: `Must be a one of the fields: ${Object.keys(Policy).join(', ')}`,
  })
  readonly policy?: Policy;
}
