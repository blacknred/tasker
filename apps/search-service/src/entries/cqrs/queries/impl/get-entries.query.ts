import { IQuery } from '@nestjs/cqrs';
import { GetEntriesDto } from '../../../dto/get-entries.dto';

export class GetEntriesQuery implements IQuery {
  constructor(
    public readonly dto: GetEntriesDto,
    public readonly userId: string,
    public readonly projectIds: string[],
  ) {}
}
