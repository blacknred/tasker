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

// POST restore
// find_account_by_email => send_email_code

// !!emailCode->email => find_account_by_email => update password

// emailcode?email=&type=restore_acc/create_acc/update_acc

// /email-code/new     not_exist
// /email-code/updste  not_exist
// patch /code/restore exist

// post account
// post account/email-code

// patch account

// get   account/restore
// patch account/restore

// get
