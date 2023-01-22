import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { ID } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CreateFilterDto, GetFiltersDto, UpdateFilterDto } from './dto';
import { Filter } from './entities';

@Injectable()
export class FiltersService {
  constructor(
    @InjectRepository(Filter)
    private filterRepository: EntityRepository<Filter>,
    @InjectPinoLogger(FiltersService.name)
    private readonly logger: PinoLogger,
  ) {}

  async create(dto: CreateFilterDto, ownerId: ID) {
    try {
      const filter = new Filter({ ...dto, ownerId });
      await this.filterRepository.nativeInsert(filter);

      return { data: filter };
    } catch (err) {
      this.logger.error(err);
      throw new PreconditionFailedException();
    }
  }

  async findAll({ limit, offset, ...rest }: GetFiltersDto) {
    const [items, total] = await this.filterRepository.findAndCount({
      where: Object.keys(rest).reduce((acc, key) => {
        if (!(User.isSearchable(key) && rest[key])) return acc;
        acc[key] = rest[key];
        return acc;
      }, {}),
      order: { [rest['sort.field'] || 'id']: rest['sort.order'] || 'ASC' },
      skip: offset,
      take: limit + 1,
      withDeleted: !partial,
    });

    return {
      data: {
        hasMore: items.length === limit + 1,
        items: items.slice(0, limit).map((i) => this.fieldMapper(i, partial)),
        total,
      },
    };
  }

  //   async execute(query: GetFilterQuery): Promise<FilterResponseDto> {
//     const { id, userId } = query;

//     // const _where = { deletedAt: null };

//     // if (uid) {
//     //   const wids = await this.agentRepository.find({ userId: uid });
//     //   _where['id'] = wids.map((w) => w.workspace);
//     //   console.log(uid, wids);
//     // }

//     // const where = Object.keys(rest).reduce((acc, key) => {
//     //   if (!(Workspace.isSearchable(key) && rest[key])) return acc;
//     //   acc[key] = { $eq: rest[key] };
//     //   return acc;
//     // }, _where);

//     // const [items, total] = await this.entryRepository..findAndCount(where, {
//     //   orderBy: { [rest['sort.field'] || 'id']: rest['sort.order'] || 'ASC' },
//     //   limit: +limit + 1,
//     //   offset: +offset,
//     // });

//     return {
//       // data: {
//       //   hasMore: items.length === +limit + 1,
//       //   items: items.slice(0, limit),
//       //   total,
//       // },
//     };
//   }

  async findOne(id: ID, ownerId: ID) {
    const filter = await this.filterRepository.findOne(id);

    if (!filter) {
      throw new NotFoundException();
    }

    if (filter.ownerId && filter.ownerId != ownerId) {
      throw new ForbiddenException();
    }

    return { data: filter };
  }

  async update(id: ID, dto: UpdateFilterDto, ownerId: ID) {
    const filter = await this.findOne(id, ownerId);

    try {
      wrap(filter).assign(dto);
      await this.filterRepository.flush();

      return { data: filter };
    } catch (err) {
      this.logger.error(err);
      throw new PreconditionFailedException();
    }
  }

  async remove(id: ID, ownerId: ID) {
    await this.findOne(id, ownerId);

    try {
      await this.filterRepository.nativeDelete({ id });

      return { data: null };
    } catch (err) {
      this.logger.error(err);
      throw new PreconditionFailedException();
    }
  }
}
