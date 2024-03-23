import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SprintsResponseDto } from '../../dto';
import { Sprint } from '../../entities';
import { GetSprintsQuery } from '../impl';

@QueryHandler(GetSprintsQuery)
export class GetSprintsHandler implements IQueryHandler<GetSprintsQuery> {
  constructor(
    @InjectRepository(Sprint)
    private sprintsRepository: EntityRepository<Sprint>,
  ) {}

  async execute(query: GetSprintsQuery): Promise<SprintsResponseDto> {
    const { dto } = query;
    const { limit, offset, ...rest } = dto;

    return {};
  }
}
