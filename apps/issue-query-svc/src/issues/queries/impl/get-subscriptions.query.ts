import { IQuery } from '@nestjs/cqrs';
import { ID } from '@taskapp/shared';
import { GetSubscriptionsDto } from '../../dto';

export class GetSubscriptionsQuery implements IQuery {
  constructor(
    public readonly issueId: ID,
    public readonly dto: GetSubscriptionsDto,
  ) {}
}
