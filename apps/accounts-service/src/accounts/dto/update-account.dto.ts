import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationMethod, SecuredNotificationMethod } from '@taskapp/shared';
import {
  IsEnum,
  IsLocale,
  IsOptional,
  IsPhoneNumber,
  IsUrl,
  MinLength,
} from 'class-validator';
import { CreateAccountDto } from './create-account.dto';

export class UpdateAccountDto extends PartialType(
  OmitType(CreateAccountDto, ['inviteToken']),
) {
  @ApiProperty({ type: 'string', example: 'user info', required: false })
  @IsOptional()
  @MinLength(1, { message: 'Empty description' })
  readonly details?: string;

  @ApiProperty({
    type: 'string',
    example: 'https://path-to-profile-avatar.png',
    required: false,
  })
  @IsOptional()
  @IsUrl({ message: 'Not valid url' })
  readonly image?: string;

  @ApiProperty({ type: 'string', example: '+1 893 287 345', required: false })
  @IsOptional()
  @IsPhoneNumber(null, { message: 'Non valid phone number' })
  readonly phone?: string;

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
  readonly notificationMethod: NotificationMethod;

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
  readonly securedNotificationMethod: SecuredNotificationMethod;

  @ApiProperty({ type: 'string', example: 'USD', required: false })
  @IsOptional()
  @IsLocale({ message: 'Non valid currency' })
  readonly currency?: string;
}
