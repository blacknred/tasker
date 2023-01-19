import { IQuery } from '@nestjs/cqrs';
import { GetFilterDto } from '../../dto/get-filter.dto';

export class GetFilterQuery implements IQuery {
  constructor(
    public readonly id: GetFilterDto['id'],
    public readonly userId: string,
  ) {}
}
