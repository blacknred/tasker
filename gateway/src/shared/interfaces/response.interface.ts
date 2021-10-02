import { HttpStatus } from '@nestjs/common';

export type ValidationError = {
  field: string;
  message: string;
};

export class IResponse<T = null> {
  status: HttpStatus;
  errors: ValidationError[] | null;
  data: T;
}
