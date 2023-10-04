import { ApiProperty } from '@nestjs/swagger';
import { workspaceMock } from '@taskapp/shared';
import { IsUUID } from 'class-validator';

export class DeleteWorkspaceDto {
  @ApiProperty({
    type: 'uuid',
    example: workspaceMock.id,
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly id: string;
}
