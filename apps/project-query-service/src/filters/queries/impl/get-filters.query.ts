import { IQuery } from '@nestjs/cqrs';
import { GetFiltersDto } from '../../dto/get-filters.dto';

export class GetFiltersQuery implements IQuery {
  constructor(
    public readonly dto: GetFiltersDto,
    public readonly userId: string,
  ) {}
}
