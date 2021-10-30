import {
  PaginatedResponseDto,
  ResponseDto,
} from 'src/__shared__/dto/response.dto';
import { ISaga } from '../interfaces/saga.interface';

export class SagaResponseDto extends ResponseDto<ISaga> {}

export class SagasResponseDto extends PaginatedResponseDto<ISaga> {}
