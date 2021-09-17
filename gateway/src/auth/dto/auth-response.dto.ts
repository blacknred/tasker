import { ApiProperty } from '@nestjs/swagger';
import { ResponseError } from '../interfaces/response.interface';

export class AuthResponseDto {
  @ApiProperty({
    example: { token: 'token' },
    nullable: true,
  })
  data: {
    token: string;
  };
  @ApiProperty({ example: null, nullable: true })
  errors: ResponseError[];
}
