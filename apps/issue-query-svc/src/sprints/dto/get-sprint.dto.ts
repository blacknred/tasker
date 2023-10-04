import { ApiProperty } from '@nestjs/swagger';
import { sprintMock } from '@taskapp/shared';
import { IsUUID } from 'class-validator';

export class GetSprintDto {
  @ApiProperty({
    type: 'uuid',
    example: sprintMock.id,
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly id: string;
}
