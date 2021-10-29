import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces/user.interface';

export class CreateUserDto implements Pick<IUser, 'name' | 'email'> {
  @ApiProperty({ example: 'testname' })
  name: string;

  @ApiProperty({ uniqueItems: true, example: 'test@email.com' })
  email: string;

  @ApiProperty({ minLength: 6, example: 'testpassword' })
  password: string;
}
