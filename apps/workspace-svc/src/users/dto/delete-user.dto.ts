import { ApiProperty } from '@nestjs/swagger';
import { userMock } from '@taskapp/shared';
import { IsUUID } from 'class-validator';

export class DeleteUserDto {
  @ApiProperty({
    type: 'uuid',
    example: userMock.id,
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly uid: string;
}
