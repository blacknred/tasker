import { ApiProperty } from '@nestjs/swagger';
import { ISearchEntry, ResponseDto, searchEntryMock } from '@taskapp/shared';

export class EntryResponseDto extends ResponseDto<ISearchEntry> {
  @ApiProperty({ example: searchEntryMock, required: false })
  readonly data?: ISearchEntry;
}
