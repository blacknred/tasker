import { IQuery } from '@nestjs/cqrs';
import { GetIssuesDto } from '../../dto';
import { ID } from '@taskapp/shared';

export class GetIssuesQuery implements IQuery {
  constructor(
    public readonly projectId: ID,
    public readonly dto: GetIssuesDto,
  ) {}
}
