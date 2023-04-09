import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, Length } from 'class-validator';

export class PassTfaDto {
  @ApiProperty({ type: 'string', example: '123456' })
  @IsNumberString(null, { message: 'Must be a number string' })
  @Length(6, 6, { message: 'Must include 6 digits' })
  readonly totp: string;

  @ApiProperty({ type: 'string', example: 'YWLRY42TSAMP2JNH' })
  @Length(16, 16, { message: 'Must include 16 chars' })
  readonly reserveCode?: string;
}
