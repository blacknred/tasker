export interface ISorting {
  'sort.field'?: string;
  'sort.order'?: 'ASC' | 'DESC';
}

export interface IOffsetPagination {
  limit: number;
  offset?: number;
}

export interface IPaginatedRequest extends ISorting, IOffsetPagination {}
