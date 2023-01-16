import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@taskapp/service-core';
import { ISearchEntry, SearchEntryType } from '@taskapp/shared';

export const entryMock: ISearchEntry = {
  id: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  projectId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  type: SearchEntryType.ISSUE,
  text: 'SP-1',
};

export class EntryResponseDto extends ResponseDto<ISearchEntry> {
  @ApiProperty({ example: entryMock, required: false })
  data?: ISearchEntry;
}
