import { IQuery } from '@nestjs/cqrs';
import type { ID } from '@taskapp/shared';
import { GetProjectDto } from '../../dto';

export class GetProjectQuery implements IQuery {
  constructor(
    public readonly id: GetProjectDto['id'],
    public readonly allowedProjects: ID[],
  ) {}
}
