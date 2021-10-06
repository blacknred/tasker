import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({ example: 'test@email.com' })
  email: string;
  @ApiProperty({ example: 'testpassword' })
  password: string;
}
