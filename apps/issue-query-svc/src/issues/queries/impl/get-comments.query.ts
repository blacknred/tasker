import { IQuery } from '@nestjs/cqrs';
import { ID } from '@taskapp/shared';

export class GetCommentsQuery implements IQuery {
  constructor(public readonly issueId: ID) {}
}
