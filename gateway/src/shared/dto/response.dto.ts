import { ApiProperty } from '@nestjs/swagger';
import { ValidationError } from '../interfaces/response.interface';

export class ResponseDto {
  data?: unknown;
  @ApiProperty({ example: null, nullable: true, type: null })
  errors?: ValidationError[];
}
