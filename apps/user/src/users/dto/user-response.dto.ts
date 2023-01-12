import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@taskapp/service-core';
import {
  IUser,
  NotificationMethod,
  SecuredNotificationMethod,
} from '@taskapp/shared';
import { roleMock } from '../../roles/dto/role-response.dto';

export const userMock: IUser = {
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
  isConfirmed: true,
  is2faEnabled: false,
  currency: 'USD',
  locale: 'en_EN',
  createdAt: '2022-08-14 13:55:16.622111',
  roles: [roleMock],
};

export class UserResponseDto extends ResponseDto<IUser> {
  @ApiProperty({ example: userMock, required: false })
  data?: IUser;
}
