import { ApiProperty } from '@nestjs/swagger';
import { projectMock } from '@taskapp/shared';
import { IsUUID } from 'class-validator';

export class DeleteProjectDto {
  @ApiProperty({
    type: 'uuid',
    example: projectMock.id,
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly pid: string;
}
