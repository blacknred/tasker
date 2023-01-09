export type ValidationErrorDto = {
  field: string;
  message: string;
};

export type PaginatedDataDto<T> = {
  hasMore: boolean;
  total?: number;
  items: T[];
};

export type ResponseDto<T = unknown> = {
  message?: string;
  errors?: ValidationErrorDto[];
  data?: T;
};

export type EmptyResponseDto = ResponseDto<null>;

export type PaginatedResponseDto<T> = ResponseDto<PaginatedDataDto<T>>;
