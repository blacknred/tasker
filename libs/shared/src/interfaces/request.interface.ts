export type SortingDto = {
  'sort.field'?: string;
  'sort.order'?: 'ASC' | 'DESC';
};

export type OffsetPaginationDto = {
  limit: number;
  offset?: number;
};

export type PaginatedRequestDto = SortingDto & OffsetPaginationDto;
