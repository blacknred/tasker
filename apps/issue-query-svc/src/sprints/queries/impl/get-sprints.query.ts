import { IQuery } from '@nestjs/cqrs';
import { GetSprintsDto } from '../../dto';

export class GetSprintsQuery implements IQuery {
  constructor(public readonly dto: GetSprintsDto) {}
}
