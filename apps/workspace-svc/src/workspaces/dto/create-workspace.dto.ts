import { ApiProperty } from '@nestjs/swagger';
import { userMock, workspaceMock } from '@taskapp/shared';
import { IsBoolean, IsEmail, IsOptional, Length } from 'class-validator';

export class CreateWorkspaceDto {
  @ApiProperty({ type: 'string', example: workspaceMock.name })
  @Length(1, 100, { message: 'Must have from 1 to 100 chars' })
  readonly name: string;

  @ApiProperty({ type: 'string', example: userMock.username })
  @Length(1, 100, { message: 'Must have from 1 to 100 chars' })
  readonly username: string;

  @ApiProperty({ type: 'string', example: userMock.email })
  @IsEmail(null, { message: 'Non valid email' })
  readonly email: string;

  @ApiProperty({
    type: 'string',
    example: workspaceMock.details,
    required: false,
  })
  @IsOptional()
  @Length(1, 500, { message: 'Must have from 1 to 1000 chars' })
  readonly details?: string;

  @ApiProperty({
    type: 'boolean',
    example: workspaceMock.totp,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly totp: boolean;
}
