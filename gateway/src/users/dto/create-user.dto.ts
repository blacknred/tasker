import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    example: 'username',
  })
  name: string;
  @ApiProperty({
    uniqueItems: true,
    example: 'test@test.com',
  })
  email: string;
  @ApiProperty({
    minLength: 6,
    example: 'password',
  })
  password: string;
}
