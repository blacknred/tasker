import { HttpStatus } from '@nestjs/common';

export class ValidationError {
  field: string;
  message: string;
}

export class Paginated<T> {
  hasMore: boolean;
  total: number;
  items: T[];
}

export class ResponseDto<T = null> {
  status: HttpStatus;
  errors?: ValidationError[];
  data?: T;
}

export class PaginatedResponseDto<T> extends ResponseDto<Paginated<T>> {}
