import { HttpStatus } from '@nestjs/common';

export type ResponseError = {
  field: string;
  message: string;
};

export class IResponse<T = null> {
  status: HttpStatus;
  errors?: ResponseError[];
  data?: T;
}
