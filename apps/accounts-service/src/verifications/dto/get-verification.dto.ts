import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, Length } from 'class-validator';

export class GetVerificationDto {
  @ApiProperty({ type: 'string', example: '123456' })
  @IsNumberString(null, { message: 'Must be a number string' })
  @Length(6, 6, { message: 'Must include 6 digits' })
  readonly code: string;
}
