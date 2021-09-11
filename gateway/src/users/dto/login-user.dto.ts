import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'test@test.com' })
  email: string;
  @ApiProperty({ example: 'password' })
  password: string;
}
