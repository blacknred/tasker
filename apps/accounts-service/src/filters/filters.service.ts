import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { IAuth, ID, IFilter } from '@taskapp/shared';
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
      const schema = Filter.serializeSchema(dto.schema);
      const data = new Filter({ ...dto, schema, ownerId });
      await this.filterRepository.nativeInsert(data);

      return { data };
    } catch (err) {
      this.logger.error(err);
      throw new PreconditionFailedException();
    }
  }

  async findAll(dto: GetFiltersDto, ownerId: IAuth['userId']) {
    const { limit, offset, ...rest } = dto;
    const [items, total] = await this.filterRepository.findAndCount({
      where: Object.keys(rest).reduce(
        (acc, key) => {
          if (!(Filter.isSearchable(key) && rest[key])) return acc;
          acc[key] = rest[key];
          return acc;
        },
        { ownerId },
      ),
      order: {
        [rest['sort.field'] || 'createdAt']: rest['sort.order'] || 'ASC',
      },
      skip: offset,
      take: limit + 1,
    });

    return {
      data: {
        hasMore: items.length === limit + 1,
        items: items.slice(0, limit),
        total,
      },
    };
  }

  async findOne(id: IFilter['id'], ownerId: IAuth['userId']) {
    const data = await this.filterRepository.findOne(id);

    if (!data) {
      throw new NotFoundException();
    }

    if (data.ownerId && data.ownerId != ownerId) {
      throw new ForbiddenException();
    }

    return { data };
  }

  async update(
    id: IFilter['id'],
    dto: UpdateFilterDto,
    ownerId: IAuth['userId'],
  ) {
    const { data } = await this.findOne(id, ownerId);

    try {
      const schema = Filter.serializeSchema(dto.schema);
      wrap(data).assign({ ...dto, schema });
      await this.filterRepository.flush();

      return { data };
    } catch (err) {
      this.logger.error(err);
      throw new PreconditionFailedException();
    }
  }

  async remove(id: IFilter['id'], ownerId: IAuth['userId']) {
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
