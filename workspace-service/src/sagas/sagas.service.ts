import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { IAgent } from 'src/agents/interfaces/agent.interface';
import { Privilege } from 'src/roles/interfaces/role.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { ObjectID, Repository } from 'typeorm';
import { CreateSagaDto } from './dto/create-saga.dto';
import { GetSagasDto } from './dto/get-sagas.dto';
import { UpdateSagaDto } from './dto/update-saga.dto';
import { Saga } from './entities/saga.entity';

@Injectable()
export class SagasService {
  private readonly logger = new Logger(SagasService.name);

  constructor(
    @InjectRepository(Saga) private sagaRepository: Repository<Saga>,
  ) {}

  async create(createSagaDto: CreateSagaDto, agent: IAgent) {
    try {
      const { workspaceId, id: creatorId } = agent;
      const params = { ...createSagaDto, workspaceId, creatorId };
      const saga = this.sagaRepository.create(params);
      const data = await this.sagaRepository.save(saga);
      data.id = data.id.toString() as unknown as ObjectID;

      return {
        status: HttpStatus.CREATED,
        data,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }

  async findAll({ limit, offset, ...rest }: GetSagasDto, agent: IAgent) {
    const where = { workspaceId: agent.workspaceId };

    if (!agent.role?.privileges.includes(Privilege.READ_ANY_SAGA)) {
      where['creator.id'] = agent.id;
    }

    const [tasks, total] = await this.sagaRepository.findAndCount({
      where: Object.keys(rest).reduce((acc, key) => {
        if (!(Saga.isSearchable(key) && rest[key])) return acc;
        acc[key] = rest[key];
        return acc;
      }, where),
      order: { [rest['sort.field'] || 'id']: rest['sort.order'] || 'ASC' },
      skip: +offset,
      take: +limit + 1,
    });

    return {
      status: HttpStatus.OK,
      data: {
        hasMore: tasks.length === +limit + 1,
        items: tasks.slice(0, limit),
        total,
      },
    };
  }

  async findOne(id: ObjectID, agent: IAgent) {
    const saga = await this.sagaRepository.findOne(id);

    if (!saga) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    this.sagaRepository.find;

    if (
      saga.creator.id !== agent.id &&
      !agent.role?.privileges.includes(Privilege.READ_ANY_SAGA)
    ) {
      return {
        status: HttpStatus.FORBIDDEN,
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      data: saga,
    };
  }

  async update({ id, ...rest }: UpdateSagaDto, agent: IAgent) {
    try {
      const res = await this.findOne(id, agent);
      if (!res.data) return res as ResponseDto;

      if (
        res.data.creator.id !== agent.id &&
        !agent.role?.privileges.includes(Privilege.EDIT_ANY_SAGA)
      ) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      await this.sagaRepository.update(id, rest);

      return {
        status: HttpStatus.OK,
        data: { ...res.data, ...rest },
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }

  async remove(id: ObjectID, agent: IAgent) {
    try {
      const res = await this.findOne(id, agent);
      if (!res.data) return res as ResponseDto;

      if (
        res.data.creator.id !== agent.id &&
        !agent.role?.privileges.includes(Privilege.DELETE_ANY_SAGA)
      ) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      const deleted = await this.sagaRepository.delete(id);

      if (!deleted.affected) {
        return {
          status: HttpStatus.CONFLICT,
          data: null,
        };
      }

      return {
        status: HttpStatus.OK,
        data: null,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }
}
