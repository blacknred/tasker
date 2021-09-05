import { HttpStatus } from '@nestjs/common';

export type ResponseError = {
  field: string;
  message: string;
};

export class ResponseDto<T = unknown> {
  status: HttpStatus;
  errors?: ResponseError[];
  data?: T;
}
