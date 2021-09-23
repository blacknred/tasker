import { ApiProperty } from '@nestjs/swagger';
import { ValidationError } from '../interfaces/response.interface';

export class BaseResponseDto {
  @ApiProperty({ example: null, nullable: true })
  errors?: ValidationError[];
}

export class EmptyResponseDto extends BaseResponseDto {
  @ApiProperty({ example: null, nullable: true, type: null })
  data: null;
}
