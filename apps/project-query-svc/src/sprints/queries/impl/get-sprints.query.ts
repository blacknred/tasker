import { IQuery } from '@nestjs/cqrs';
import { ID } from '@taskapp/shared';
import { GetSprintsDto } from '../../dto';

export class GetSprintsQuery implements IQuery {
  constructor(
    public readonly projectId: ID,
    public readonly dto: GetSprintsDto,
  ) {}
}
