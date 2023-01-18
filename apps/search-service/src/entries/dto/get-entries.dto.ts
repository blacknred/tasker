import { ApiProperty } from '@nestjs/swagger';
import { OffsetPaginationDto } from '@taskapp/service-core';
import { SearchEntryType } from '@taskapp/shared';
import { IsEnum, IsOptional, IsUUID, Length } from 'class-validator';

export class GetEntriesDto extends OffsetPaginationDto {
  @ApiProperty({ type: 'string', example: 'SP-1' })
  @Length(0, 100, { message: 'Must have up to 100 chars' })
  q: string;

  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
    required: true,
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  projectId: string;

  @ApiProperty({
    enum: SearchEntryType,
    example: SearchEntryType.ISSUE,
    required: false,
  })
  @IsOptional()
  @IsEnum(SearchEntryType, {
    message: `Must be a one of the fields: ${Object.keys(SearchEntryType).join(
      ', ',
    )}`,
  })
  type?: SearchEntryType;
}
