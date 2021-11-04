import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'testuser', nullable: false })
  name: string;

  @ApiProperty({
    uniqueItems: true,
    example: 'test@email.com',
    nullable: false,
  })
  email: string;

  @ApiProperty({ minLength: 6, example: 'testpassword', nullable: false })
  password: string;
}
