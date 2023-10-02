import { IQuery } from '@nestjs/cqrs';
import { GetIssueDto } from '../../dto';

export class GetIssueQuery implements IQuery {
  constructor(public readonly id: GetIssueDto['id']) {}
}
