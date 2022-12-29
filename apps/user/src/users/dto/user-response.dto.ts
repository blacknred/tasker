import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@taskapp/service-core';
import { IUser, ExtraNotificationMethod } from '@taskapp/types';

export const userMock: IUser = {
  id: 2,
  email: 'test@email.com',
  phone: '+1 893 287 345',
  extraNotificationMethod: ExtraNotificationMethod.EMAIL,
  isAdmin: false,
  currency: 'USD',
  locale: 'en_EN',
  createdAt: '2022-08-14 13:55:16.622111',
  profile: {
    username: 'John Foo',
    image: 'https://path-to-profile-avatar.png',
    bio: 'user info',
    userId: 2,
  },
};

export class UserResponseDto extends ResponseDto<Partial<IUser>> {
  @ApiProperty({ example: userMock, required: false })
  data?: IUser;
}
