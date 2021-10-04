import { HttpStatus } from '@nestjs/common';

export type ValidationError = {
  field: string;
  message: string;
};

export class ResponseDto<T = unknown> {
  status: HttpStatus;
  errors?: ValidationError[];
  data?: T;
}
