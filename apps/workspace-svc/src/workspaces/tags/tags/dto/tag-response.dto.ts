import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@taskapp/service-core';
import { ITag } from '@taskapp/shared';

export const tagMock: ITag = {
  id: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  projectId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  name: 'Extra feature',
  color: '#333333',
};

export class TagResponseDto extends ResponseDto<ITag> {
  @ApiProperty({ example: tagMock, required: false })
  data?: ITag;
}
