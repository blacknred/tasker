import { IQuery } from '@nestjs/cqrs';
import { GetProjectDto } from '../../dto';

export class GetProjectQuery implements IQuery {
  constructor(public readonly id: GetProjectDto['id']) {}
}
