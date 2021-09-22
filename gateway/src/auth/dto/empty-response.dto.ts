import { ApiProperty } from '@nestjs/swagger';
import { ResponseError } from '../interfaces/response.interface';

export class BaseResponseDto {
  @ApiProperty({ example: null, nullable: true, type: null })
  errors?: ResponseError[];
}

export class EmptyResponseDto extends BaseResponseDto {
  @ApiProperty({ example: null, nullable: true, type: null })
  data: null;
}
