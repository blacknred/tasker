import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SprintResponseDto } from '../../dto';
import { Sprint } from '../../entities/sprint.entity';
import { GetSprintQuery } from '../impl';

@QueryHandler(GetSprintQuery)
export class GetSprintHandler implements IQueryHandler<GetSprintQuery> {
  constructor(
    @InjectRepository(Sprint)
    private sprintRepository: EntityRepository<Sprint>,
  ) {}

  async execute(query: GetSprintQuery): Promise<SprintResponseDto> {
    const { id } = query;
    return {};
  }
}
