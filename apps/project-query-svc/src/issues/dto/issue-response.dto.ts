import { ApiProperty } from '@nestjs/swagger';
import { IIssue, ResponseDto, issueMock } from '@taskapp/shared';

export class IssueResponseDto extends ResponseDto<IIssue> {
  @ApiProperty({ example: issueMock, required: false })
  readonly data?: IIssue;
}
