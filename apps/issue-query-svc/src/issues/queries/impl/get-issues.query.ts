import { IQuery } from '@nestjs/cqrs';
import { GetIssuesDto } from '../../dto';

export class GetIssuesQuery implements IQuery {
  constructor(public readonly dto: GetIssuesDto) {}
}
