import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Must be a string' })
  name: string;
  @IsEmail(null, { message: 'Invalid email' })
  email: string;
  @IsString({ message: 'Must be a string' })
  @Length(8, null, { message: 'Must include atleast 6 chars' })
  password: string;
}
