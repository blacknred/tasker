import { ApiProperty } from '@nestjs/swagger';

export class SortingDto {
  @ApiProperty({ required: true, example: 'createdAt' })
  field: string;
  @ApiProperty({ required: true, example: 'DESC' })
  direction: string;
}

export class PaginatedRequestDto {
  @ApiProperty({ required: false, example: 20 })
  limit: number;
  @ApiProperty({ required: false, example: 1 })
  page: number;
  @ApiProperty({ required: false, type: SortingDto })
  sorting?: SortingDto;
}
