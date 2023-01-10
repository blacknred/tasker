import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@taskapp/service-core';
import { IUser, NotificationMethod } from '@taskapp/shared';

export const userMock: IUser = {
  id: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  username: 
  name
  email: 'test@email.com',
  phone: '+1 893 287 345',
  extraNotificationMethod: NotificationMethod.EMAIL,
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

export class ProjectMemberResponseDto extends ResponseDto<Partial<IUser>> {
  @ApiProperty({ example: userMock, required: false })
  data?: IUser;
}
