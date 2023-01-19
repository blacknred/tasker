import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EntriesResponseDto } from '../../../dto/entries-response.dto';
import { GetEntriesQuery } from '../impl/get-entries.query';

@QueryHandler(GetEntriesQuery)
export class GetEntriesHandler implements IQueryHandler<GetEntriesQuery> {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
    @InjectPinoLogger(GetEntriesHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute(query: GetEntriesQuery): Promise<EntriesResponseDto> {
    const { dto, userId, projectIds } = query;
    const { limit, offset, ...rest } = dto;

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
