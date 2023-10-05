import { ApiProperty } from '@nestjs/swagger';
import { OffsetPaginationDto, searchEntryMock } from '@taskapp/shared';
import { SearchEntryType } from '@taskapp/shared';
import { IsEnum, IsOptional, IsUUID, Length } from 'class-validator';

export class GetEntriesDto extends OffsetPaginationDto {
  @ApiProperty({ type: 'string', example: searchEntryMock.text })
  @Length(2, 30, { message: 'Must have from 2 to 30 chars' })
  readonly text: string;

  @ApiProperty({
    type: 'uuid',
    example: searchEntryMock.projectId,
    required: false,
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly projectId?: string;

  @ApiProperty({
    enum: SearchEntryType,
    example: searchEntryMock.type,
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
