import { IQuery } from '@nestjs/cqrs';
import { ID } from '@taskapp/shared';

export class GetSprintQuery implements IQuery {
  constructor(public readonly projectId: ID, public readonly sprintId: ID) {}
}
