import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ type: 'string', example: 'test@email.com' })
  @IsEmail(null, { message: 'Non valid email' })
  readonly email: string;

  @ApiProperty({ type: 'string', example: 'testpass' })
  @MinLength(8, { message: 'Must include atleast 8 chars' })
  readonly password: string;
}
