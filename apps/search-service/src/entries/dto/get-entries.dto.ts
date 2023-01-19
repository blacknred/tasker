import { ApiProperty } from '@nestjs/swagger';
import { OffsetPaginationDto } from '@taskapp/shared';
import { SearchEntryType } from '@taskapp/shared';
import { IsEnum, IsOptional, IsUUID, Length } from 'class-validator';

export class GetEntriesDto extends OffsetPaginationDto {
  @ApiProperty({ type: 'string', example: 'SP-1' })
  @Length(2, 30, { message: 'Must have from 2 to 30 chars' })
  readonly q: string;

  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
    required: true,
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly projectId?: string;

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
  readonly type?: SearchEntryType;
}
