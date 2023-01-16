import { ApiProperty } from '@nestjs/swagger';
import {
  IEmptyResponse,
  IPaginatedData,
  IPaginatedResponse,
  IResponse,
  IValidationError,
} from '../interfaces';

export class ValidationErrorDto implements IValidationError {
  @ApiProperty({ type: 'string', example: 'email' })
  field: string;

  @ApiProperty({ type: 'string', example: 'Must be an valid email' })
  message: string;
}

export class PaginatedDataDto<T> implements IPaginatedData<T> {
  @ApiProperty({ type: 'boolean', example: true })
  hasMore: boolean;

  @ApiProperty({ type: 'number', example: 100, required: false })
  total?: number;

  @ApiProperty({ isArray: true, example: null })
  items: T[];
}

export class ResponseDto<T = unknown> implements IResponse {
  @ApiProperty({ type: 'string', required: false })
  message?: string;

  @ApiProperty({
    type: ValidationErrorDto,
    isArray: true,
    required: false,
  })
  errors?: ValidationErrorDto[];

  @ApiProperty({ required: false })
  data?: T;
}

export class EmptyResponseDto
  extends ResponseDto<null>
  implements IEmptyResponse {}

export class PaginatedResponseDto<T>
  extends ResponseDto<PaginatedDataDto<T>>
  implements IPaginatedResponse<T> {}
