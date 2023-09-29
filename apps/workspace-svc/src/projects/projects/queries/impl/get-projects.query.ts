import { IQuery } from '@nestjs/cqrs';
import type { ID } from '@taskapp/shared';
import { GetProjectsDto } from '../../dto';

export class GetProjectsQuery implements IQuery {
  constructor(
    public readonly dto: GetProjectsDto,
    public readonly allowedProjects: ID[],
  ) {}
}
