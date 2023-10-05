import { ApiProperty } from '@nestjs/swagger';
import { userMock } from '@taskapp/shared';
import { IsEmail, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: 'string', example: userMock.email })
  @IsEmail(null, { message: 'Non valid email' })
  readonly email: string;

  @ApiProperty({ type: 'string', example: userMock.username, required: false })
  @IsOptional()
  @Length(1, 100, { message: 'Must have from 1 to 100 chars' })
  readonly username?: string;
}
