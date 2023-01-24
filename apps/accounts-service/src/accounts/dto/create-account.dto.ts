import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsLocale, Length, MinLength } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ type: 'string', example: 'John Dou' })
  @Length(5, 100, { message: 'Must have from 5 to 100 chars' })
  readonly name: string;

  @ApiProperty({ type: 'string', example: 'Johndou' })
  @Length(5, 30, { message: 'Must have from 5 to 30 chars' })
  readonly username: string;

  @ApiProperty({ type: 'string', example: 'test@email.com' })
  @IsEmail(null, { message: 'Non valid email' })
  readonly email: string;

  @ApiProperty({ type: 'string', example: 'testpass' })
  @MinLength(8, { message: 'Must include atleast 8 chars' })
  readonly password: string;

  @ApiProperty({ type: 'string', example: 'en_EN' })
  @IsLocale({ message: 'Non valid locale' })
  readonly locale: string;
}
