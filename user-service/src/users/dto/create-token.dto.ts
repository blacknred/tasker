import { IsBoolean, IsEmail, IsOptional } from 'class-validator';

export class CreateTokenDto {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  exist?: boolean;
}
