import { ApiProperty } from '@nestjs/swagger';

export class SortingDto {
  @ApiProperty({ required: false, example: 'createdAt' })
  'sort.field'?: string;

  @ApiProperty({ required: false, example: 'DESC', enum: ['ASC', 'DESC'] })
  'sort.order'?: 'ASC' | 'DESC';
}

export class PaginationDto extends SortingDto {
  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ required: false, example: 20 })
  offset?: number;
}
