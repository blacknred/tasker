import { HttpStatus } from '@nestjs/common';
import { IWorkspace } from '../interfaces/workspace.interface';

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

export class WorkspaceResponseDto extends ResponseDto<IWorkspace> {}

export class WorkspacesResponseDto extends ResponseDto<Paginated<IWorkspace>> {}
