import { ApiProperty } from '@nestjs/swagger';

export class CreateInviteDto {
  @ApiProperty({ example: 'test@email.com' })
  email: string;

  @ApiProperty({ example: 'http://website/com/account/new' })
  link: string;

  @ApiProperty({ example: 2, required: false })
  dtl?: number;
}
