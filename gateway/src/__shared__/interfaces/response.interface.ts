import { HttpStatus } from '@nestjs/common';

export type ValidationError = {
  field: string;
  message: string;
};

export interface IResponse<T = unknown> {
  status: HttpStatus;
  errors?: ValidationError[]; // | null;
  data?: T;
  meta?: Record<string, unknown>;
}
