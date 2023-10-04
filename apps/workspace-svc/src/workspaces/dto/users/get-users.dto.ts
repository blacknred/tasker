import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { PaginatedRequestDto, userMock } from '@taskapp/shared';
import { IsEmail, IsIn, IsOptional, IsUUID, Length } from 'class-validator';

export class GetUsersDto extends OmitType(PaginatedRequestDto, ['sort.field']) {
  @ApiProperty({ type: 'string', example: 'createdAt', required: false })
  @IsOptional()
  @IsIn(['username', 'firstName', 'lastName', 'email', 'createdAt'], {
    message:
      'Must be a one of the fields: username, firstName, lastName, email, createdAt',
  })
  readonly 'sort.field'?:
    | 'username'
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'createdAt';

  @ApiProperty({ type: 'string', example: userMock.username, required: false })
  @IsOptional()
  @Length(0, 100, { message: 'Must have up to 100 chars' })
  readonly username?: string;

  @ApiProperty({ type: 'string', example: userMock.firstName, required: false })
  @IsOptional()
  @Length(0, 200, { message: 'Must have up to 200 chars' })
  readonly name?: string;

  @ApiProperty({ type: 'string', example: userMock.email, required: false })
  @IsOptional()
  @IsEmail(null, { message: 'Non valid email' })
  readonly email?: string;

  @ApiProperty({
    type: 'uuid',
    example: userMock.roles[0].id,
    required: false,
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly roleId?: string;

  @ApiProperty({
    type: 'uuid',
    example: userMock.projects[0].id,
    required: false,
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly projectId?: string;
}
