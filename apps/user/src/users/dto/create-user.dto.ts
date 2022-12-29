import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsLocale, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: 'string', example: 'John Foo' })
  @Length(5, 100, { message: 'Must have from 5 to 100 chars' })
  username: string;

  @ApiProperty({ type: 'string', example: 'test@email.com' })
  @IsEmail(null, { message: 'Non valid email' })
  email: string;

  @ApiProperty({ type: 'string', example: 'testpass' })
  @MinLength(8, { message: 'Must include atleast 8 chars' })
  password: string;

  @ApiProperty({ type: 'string', example: 'en_EN' })
  @IsLocale({ message: 'Non valid locale' })
  locale: string;
}

// @IsNotEmpty()
// @IsString({ message: 'Must be a string' })
// emailToken: string;
