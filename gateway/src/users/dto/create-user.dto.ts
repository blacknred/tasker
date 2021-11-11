import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'testuser' })
  name: string;

  @ApiProperty({ uniqueItems: true, example: 'test@email.com' })
  email: string;

  @ApiProperty({
    example: 'https://path-to-profile-image.png',
    required: false,
  })
  image?: string;

  @ApiProperty({ minLength: 6, example: 'testpassword' })
  password: string;
}
