import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUrl, IsUUID } from 'class-validator';

export class CreateInvitationDto {
  @ApiProperty({ type: 'string', example: 'test@email.com' })
  @IsEmail(null, { message: 'Non valid email' })
  readonly email: string;

  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly projectId: string;

  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly roleId: string;

  @ApiProperty({
    type: 'string',
    example: 'https://web/auth/new',
    required: false,
  })
  @IsUrl(null, { message: 'Must be an url' })
  readonly signupPath: string;
}
