import { ApiProperty } from '@nestjs/swagger';
import { ISprint, ResponseDto, sprintMock } from '@taskapp/shared';

export class SprintResponseDto extends ResponseDto<ISprint> {
  @ApiProperty({ example: sprintMock, required: false })
  readonly data?: ISprint;
}
