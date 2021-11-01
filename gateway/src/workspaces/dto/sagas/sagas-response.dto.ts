import { ApiProperty } from '@nestjs/swagger';
import { ISaga } from 'src/workspaces/interfaces/saga.interface';
import { PaginatedResponseDto } from 'src/__shared__/dto/response.dto';
import { sagaMock } from './saga-response.dto';

const sagaPaginationMock = {
  hasMore: true,
  total: 100,
  items: [sagaMock],
};

export class SagasResponseDto extends PaginatedResponseDto<ISaga> {
  @ApiProperty({ example: sagaPaginationMock, nullable: true })
  data: {
    hasMore: boolean;
    total: number;
    items: ISaga[];
  };
}
