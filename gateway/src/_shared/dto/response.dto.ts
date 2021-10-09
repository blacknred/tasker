import { ApiProperty } from '@nestjs/swagger';
import { ValidationError } from '../interfaces/response.interface';

export class ResponseDto {
  @ApiProperty({ example: null, nullable: true, required: false })
  data?: unknown;
  @ApiProperty({ example: null, nullable: true, required: false })
  errors?: ValidationError[];
}
