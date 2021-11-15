import { ApiProperty } from '@nestjs/swagger';

export class CreateEmailTokenDto {
  @ApiProperty({ example: 'test@email.com' })
  email: string;

  @ApiProperty({ example: 'http://website/com/account/new' })
  link: string;

  @ApiProperty({ example: true, required: false })
  exist?: boolean;
}
