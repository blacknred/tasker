import { ApiProperty } from '@nestjs/swagger';
import { roleMock } from '@taskapp/shared';
import { IsUUID } from 'class-validator';

export class GetRoleDto {
  @ApiProperty({
    type: 'uuid',
    example: roleMock.id,
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly rid: string;
}
