import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@taskapp/shared';
import { IFilter, IssueFilterField } from '@taskapp/shared';

export const filterMock: IFilter = {
  id: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  ownerId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  name: 'My Filter',
  schema: `?${IssueFilterField.ASSIGNEE_ID}=b4db61c5-d10e-4ed3-a903-b8fd75fc3d30`,
};

export class FilterResponseDto extends ResponseDto<IFilter> {
  @ApiProperty({ example: filterMock, required: false })
  readonly data?: IFilter;
}
