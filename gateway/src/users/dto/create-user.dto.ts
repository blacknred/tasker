import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces/user.interface';
export class CreateUserDto implements Pick<IUser, 'name' | 'email'> {
  @ApiProperty({
    example: 'username',
  })
  name: string;
  @ApiProperty({
    uniqueItems: true,
    example: 'test@test.com',
  })
  email: string;
  @ApiProperty({
    minLength: 6,
    example: 'password',
  })
  password: string;
}
