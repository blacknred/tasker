import { IQuery } from '@nestjs/cqrs';
import { ID } from '@taskapp/shared';
import { GetVotesDto } from '../../dto';

export class GetVotesQuery implements IQuery {
  constructor(public readonly issueId: ID, public readonly dto: GetVotesDto) {}
}
