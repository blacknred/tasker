import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({ example: 'test@test.com' })
  email: string;
  @ApiProperty({ example: 'password' })
  password: string;
}
