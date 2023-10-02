import { IQuery } from '@nestjs/cqrs';
import { ID } from '@taskapp/shared';
import { GetCommentsDto } from '../../dto';

export class GetCommentsQuery implements IQuery {
  constructor(
    public readonly issueId: ID,
    public readonly dto: GetCommentsDto,
  ) {}
}
