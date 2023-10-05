import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IssuesResponseDto } from '../../dto';
import { Issue } from '../../entities';
import { GetIssuesQuery } from '../impl';

@QueryHandler(GetIssuesQuery)
export class GetIssuesHandler implements IQueryHandler<GetIssuesQuery> {
  constructor(
    @InjectRepository(Issue)
    private issuesRepository: EntityRepository<Issue>,
  ) {}

  async execute(query: GetIssuesQuery): Promise<IssuesResponseDto> {
    const { dto } = query;
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
