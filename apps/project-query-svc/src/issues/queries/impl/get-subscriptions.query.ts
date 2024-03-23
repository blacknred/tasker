import { IQuery } from '@nestjs/cqrs';
import { ID } from '@taskapp/shared';

export class GetSubscriptionsQuery implements IQuery {
  constructor(public readonly projectId: ID, public readonly issueId: ID) {}
}
