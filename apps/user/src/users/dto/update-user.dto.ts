import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationMethod, SecuredNotificationMethod } from '@taskapp/types';
import {
  IsEnum,
  IsLocale,
  IsOptional,
  IsPhoneNumber,
  IsUrl,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ type: 'string', example: 'user info', required: false })
  @IsOptional()
  @MinLength(1, { message: 'Empty description' })
  details?: string;

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
    enum: NotificationMethod,
    example: NotificationMethod.PUSH,
    required: false,
  })
  @IsOptional()
  @IsEnum(NotificationMethod, {
    message: `Must be a one of the fields: ${Object.keys(
      NotificationMethod,
    ).join(', ')}`,
  })
  notificationMethod: NotificationMethod;

  @ApiProperty({
    enum: SecuredNotificationMethod,
    example: SecuredNotificationMethod.EMAIL,
    required: false,
  })
  @IsOptional()
  @IsEnum(SecuredNotificationMethod, {
    message: `Must be a one of the fields: ${Object.keys(
      SecuredNotificationMethod,
    ).join(', ')}`,
  })
  securedNotificationMethod: SecuredNotificationMethod;

  @ApiProperty({ type: 'string', example: 'USD', required: false })
  @IsOptional()
  @IsLocale({ message: 'Non valid currency' })
  currency?: string;
}
