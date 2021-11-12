import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RestoreUserDto {
  @IsNotEmpty()
  @IsString({ message: 'Must be a string' })
  token: string;

  @IsString({ message: 'Must be a string' })
  @MinLength(6, { message: 'Must include atleast 6 chars' })
  password: string;
}
