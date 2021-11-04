import { IsEnum, IsOptional, MaxLength, MinLength } from 'class-validator';
import { AccessDto } from 'src/__shared__/dto/request.dto';
import { Privilege } from '../interfaces/role.interface';

export class CreateRoleDto extends AccessDto {
  @MinLength(5, { message: 'Must include atleast 5 chars' })
  @MaxLength(100, { message: 'Must include no more than 100 chars' })
  name: string;

  @IsOptional()
  @IsEnum(Privilege, {
    message: 'Must be one of the Privilege enum',
    each: true,
  })
  privileges?: Privilege[];
}
