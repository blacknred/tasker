import { ApiProperty } from '@nestjs/swagger';
import {
  IAccount,
  NotificationMethod,
  ResponseDto,
  SecuredNotificationMethod,
} from '@taskapp/shared';

export const accountMock: IAccount = {
  id: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  username: 'jdou',
  name: 'John Dou',
  email: 'test@email.com',
  details: 'freelancer',
  phone: '+1 893 287 345',
  image: 'https://path-to-profile-avatar.png',
  notificationMethod: NotificationMethod.PUSH,
  securedNotificationMethod: SecuredNotificationMethod.EMAIL,
  isAdmin: false,
  locale: 'en_EN',
  createdAt: '2022-08-14 13:55:16.622111',
  isTfaEnabled: false,
};

export class AccountResponseDto extends ResponseDto<IAccount> {
  @ApiProperty({ example: accountMock, required: false })
  readonly data?: IAccount;
}
