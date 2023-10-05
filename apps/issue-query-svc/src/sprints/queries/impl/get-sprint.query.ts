import { IQuery } from '@nestjs/cqrs';
import { GetSprintDto } from '../../dto';

export class GetSprintQuery implements IQuery {
  constructor(public readonly id: GetSprintDto['id']) {}
}
