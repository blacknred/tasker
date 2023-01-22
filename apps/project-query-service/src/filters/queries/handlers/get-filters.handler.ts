import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FiltersResponseDto } from '../../dto/filters-response.dto';
import { Filter } from '../../entities';
import { GetFiltersQuery } from '../impl/get-filters.query';

@QueryHandler(GetFiltersQuery)
export class GetFiltersHandler implements IQueryHandler<GetFiltersQuery> {
  constructor(
    @InjectRepository(Filter)
    private filterRepository: EntityRepository<Filter>,
  ) {}

  async execute(query: GetFiltersQuery): Promise<FiltersResponseDto> {
    const { dto, userId } = query;
    const { limit, offset, ...rest } = dto;

    // const _where = { deletedAt: null };

    // if (uid) {
    //   const wids = await this.agentRepository.find({ userId: uid });
    //   _where['id'] = wids.map((w) => w.workspace);
    //   console.log(uid, wids);
    // }

    // const where = Object.keys(rest).reduce((acc, key) => {
    //   if (!(Workspace.isSearchable(key) && rest[key])) return acc;
    //   acc[key] = { $eq: rest[key] };
    //   return acc;
    // }, _where);

    // const [items, total] = await this.entryRepository..findAndCount(where, {
    //   orderBy: { [rest['sort.field'] || 'id']: rest['sort.order'] || 'ASC' },
    //   limit: +limit + 1,
    //   offset: +offset,
    // });

    return {
      // data: {
      //   hasMore: items.length === +limit + 1,
      //   items: items.slice(0, limit),
      //   total,
      // },
    };
  }
}
