import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'testuser' })
  name: string;

  @ApiProperty({
    example: 'https://path-to-profile-image.png',
    required: false,
  })
  image?: string;

  @ApiProperty({ minLength: 6, example: 'testpassword' })
  password: string;

  @ApiProperty({ example: 'erq324q3r4534r234r' })
  token: string;
}
