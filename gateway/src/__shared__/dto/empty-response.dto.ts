import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from './response.dto';

export class EmptyResponseDto extends ResponseDto {
  @ApiProperty({ example: null, nullable: true, type: 'null' })
  data: null;
}
