import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, Length, MinLength } from 'class-validator';

export class RestoreAccountDto {
  @ApiProperty({ type: 'string', example: '123456' })
  @IsNumberString(null, { message: 'Must be a number string' })
  @Length(6, 6, { message: 'Must include 6 digits' })
  readonly emailCode: string;

  @ApiProperty({ type: 'string', example: 'testpass' })
  @MinLength(8, { message: 'Must include atleast 8 chars' })
  readonly password: string;
}
