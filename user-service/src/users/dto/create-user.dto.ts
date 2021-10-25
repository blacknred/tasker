import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Must be a string' })
  @MinLength(5, { message: 'Must include atleast 5 chars' })
  name: string;
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
  @IsString({ message: 'Must be a string' })
  @MinLength(8, { message: 'Must include atleast 6 chars' })
  password: string;
}
