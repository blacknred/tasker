import { ApiProperty } from '@nestjs/swagger';
import {
  IsLocale,
  IsNumberString,
  IsUUID,
  Length,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ type: 'string', example: 'John Dou' })
  @Length(5, 100, { message: 'Must have from 5 to 100 chars' })
  readonly name: string;

  @ApiProperty({ type: 'string', example: 'Johndou' })
  @Length(5, 30, { message: 'Must have from 5 to 30 chars' })
  readonly username: string;

  @ApiProperty({ type: 'string', example: 'testpass' })
  @MinLength(8, { message: 'Must include atleast 8 chars' })
  readonly password: string;

  @ApiProperty({ type: 'string', example: 'en_EN' })
  @IsLocale({ message: 'Non valid locale' })
  readonly locale: string;

  @ApiProperty({ type: 'string', example: '123456' })
  @ValidateIf((o) => !o.inviteToken || o.emailCode, {
    message: 'Either emailCode or inviteToken must be included',
  })
  @IsNumberString(null, { message: 'Must be a number string' })
  @Length(6, 6, { message: 'Must include 6 digits' })
  readonly emailCode?: string;

  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  })
  @ValidateIf((o) => !o.emailCode || o.inviteToken, {
    message: 'Either inviteToken or emailCode must be included',
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly inviteToken?: string;
}
