import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FilterResponseDto } from '../../../dto/filter-response.dto';
import { GetFilterQuery } from '../impl/get-filter.query';

@QueryHandler(GetFilterQuery)
export class GetFilterHandler implements IQueryHandler<GetFilterQuery> {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
    @InjectPinoLogger(GetFilterHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute(query: GetFilterQuery): Promise<FilterResponseDto> {
    const { id, userId } = query;

    this.em.execute('');

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
