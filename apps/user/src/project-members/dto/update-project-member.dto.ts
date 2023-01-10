import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { ExtraNotificationMethod } from '@taskapp/types';
import {
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsUrl,
  MinLength,
  IsCurrency,
} from 'class-validator';
import { CreateUserDto } from './create-project-member.dto';

export class UpdateProjectMemberDto extends PartialType(CreateUserDto) {
  @ApiProperty({ type: 'string', example: 'user info', required: false })
  @IsOptional()
  @MinLength(1, { message: 'Empty description' })
  bio?: string;

  @ApiProperty({
    type: 'string',
    example: 'https://path-to-profile-avatar.png',
    required: false,
  })
  @IsOptional()
  @IsUrl({ message: 'Not valid url' })
  image?: string;

  @ApiProperty({ type: 'string', example: '+1 893 287 345', required: false })
  @IsOptional()
  @IsPhoneNumber(null, { message: 'Non valid phone number' })
  phone?: string;

  @ApiProperty({
    enum: ExtraNotificationMethod,
    example: ExtraNotificationMethod.EMAIL,
    required: false,
  })
  @IsOptional()
  @IsEnum(ExtraNotificationMethod, {
    message: 'Must be an ExtraNotificationMethod enum',
  })
  extraNotificationMethod?: ExtraNotificationMethod;

  @ApiProperty({ type: 'string', example: 'USD' })
  @IsCurrency({ message: 'Not valid currency' })
  currency: string;
}
