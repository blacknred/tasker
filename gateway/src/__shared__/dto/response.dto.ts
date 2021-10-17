import { ApiProperty } from '@nestjs/swagger';

export class ValidationError {
  field: string;
  message: string;
}

export class Pagination<T> {
  hasMore: boolean;
  total: number;
  items: T[];
}

export class ResponseDto<T = unknown> {
  @ApiProperty({ example: null, nullable: true, required: false })
  data?: T;
  @ApiProperty({ example: null, nullable: true, required: false })
  errors?: ValidationError[];
}

export class EmptyResponseDto extends ResponseDto<null> {
  @ApiProperty({ example: null, nullable: true, type: 'null' })
  data: null;
}

export class PaginatedResponseDto<T> extends ResponseDto<Pagination<T>> {}
