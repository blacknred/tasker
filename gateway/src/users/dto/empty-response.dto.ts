import { ApiProperty } from '@nestjs/swagger';
import { ResponseError } from '../interfaces/response.interface';

export class EmptyResponseDto {
  @ApiProperty({ example: null, nullable: true, type: null })
  data?: null;
  @ApiProperty({ example: null, nullable: true })
  errors?: ResponseError[];
}
