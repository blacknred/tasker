import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/users/interfaces/user.interface';
import { PaginationDto } from 'src/__shared__/dto/request.dto';

export class GetAuthsDto extends PaginationDto {
  @ApiProperty({ example: 'testname' })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  @MinLength(5, { message: 'Must include atleast 5 chars' })
  name?: string;

  @ApiProperty({ example: 'test@email.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email' })
  email?: string;

  @ApiProperty({
    default: UserRole.USER,
    example: UserRole.USER,
    enum: UserRole,
  })
  @IsOptional()
  @IsEnum(UserRole, {
    message: `Must be one of ${Object.values(UserRole)}`,
  })
  role?: UserRole;
}
