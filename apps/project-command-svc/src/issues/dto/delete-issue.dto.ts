import { ApiProperty } from '@nestjs/swagger';
import { issueMock } from '@taskapp/shared';
import { IsUUID } from 'class-validator';

export class DeleteIssueDto {
  @ApiProperty({
    type: 'uuid',
    example: issueMock.id,
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  id: string;
}
