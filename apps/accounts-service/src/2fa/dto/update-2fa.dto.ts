import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumberString, IsOptional, Length } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ type: 'string', example: '123456' })
  @IsOptional()
  @IsNumberString(null, { message: 'Must be a number string' })
  @Length(6, 6, { message: 'Must include 6 digits' })
  readonly totp?: string;

  @ApiProperty({ type: 'boolean', example: '123456' })
  @IsBoolean({ message: 'Must be a boolean' })
  readonly status: boolean;

  
}
