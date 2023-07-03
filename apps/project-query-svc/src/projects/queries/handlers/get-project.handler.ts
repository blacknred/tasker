import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProjectResponseDto } from '../../dto';
import { Project } from '../../entities';
import { GetProjectQuery } from '../impl';

@QueryHandler(GetProjectQuery)
export class GetProjectHandler implements IQueryHandler<GetProjectQuery> {
  constructor(
    @InjectRepository(Project)
    private projectRepository: EntityRepository<Project>,
  ) {}

  async execute(query: GetProjectQuery): Promise<ProjectResponseDto> {
    const { id } = query;

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
      // data: {},
    };
  }
}
