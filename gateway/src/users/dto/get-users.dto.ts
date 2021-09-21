import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class GetUsersDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    required: false,
    example: 20,
    nullable: false,
  })
  limit: number;
  @ApiProperty({
    required: false,
    example: 1,
  })
  page: number;
}
