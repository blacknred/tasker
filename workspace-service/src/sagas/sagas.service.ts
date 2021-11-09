import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Agent } from 'src/agents/entities/agent.entity';
import { IAgent } from 'src/agents/interfaces/agent.interface';
import { Privilege } from 'src/roles/interfaces/role.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { CreateSagaDto } from './dto/create-saga.dto';
import { GetSagasDto } from './dto/get-sagas.dto';
import { UpdateSagaDto } from './dto/update-saga.dto';
import { Saga } from './entities/saga.entity';

@Injectable()
export class SagasService {
  private readonly logger = new Logger(SagasService.name);

  constructor(
    @InjectRepository(Saga) private sagaRepository: EntityRepository<Saga>,
  ) {}

  async create(createSagaDto: CreateSagaDto, agent: Agent) {
    try {
      const data = new Saga(createSagaDto);
      data.wid = agent.wid;
      data.creator = agent;
      await this.sagaRepository.persistAndFlush(data);

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

  async findAll({ limit, offset, wid, ...rest }: GetSagasDto, agent: IAgent) {
    const _where = { wid };

    // creator | READ_ANY_SAGA
    if (!agent.role?.privileges.includes(Privilege.READ_ANY_SAGA)) {
      _where['creator.id'] = agent.id;
    }

    const where = Object.keys(rest).reduce((acc, key) => {
      if (!(Saga.isSearchable(key) && rest[key])) return acc;
      acc[key] = rest[key];
      return acc;
    }, _where);

    const [items, total] = await this.sagaRepository.findAndCount(where, {
      orderBy: { [rest['sort.field'] || 'id']: rest['sort.order'] || 'ASC' },
      limit: +limit + 1,
      offset: +offset,
    });

    return {
      status: HttpStatus.OK,
      data: {
        hasMore: items.length === +limit + 1,
        items: items.slice(0, limit),
        total,
      },
    };
  }

  async findOne(id: string, agent: IAgent) {
    const data = await this.sagaRepository.findOne(id);

    if (!data) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    // creator | READ_ANY_SAGA
    if (
      data.creator.id !== agent.id &&
      !agent.role?.privileges.includes(Privilege.READ_ANY_SAGA)
    ) {
      return {
        status: HttpStatus.FORBIDDEN,
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      data,
    };
  }

  async update({ id, ...rest }: UpdateSagaDto, agent: IAgent) {
    try {
      const res = await this.findOne(id, agent);
      if (!res.data) return res as ResponseDto;

      // creator | EDIT_ANY_SAGA
      if (
        res.data.creator.id !== agent.id &&
        !agent.role?.privileges.includes(Privilege.EDIT_ANY_SAGA)
      ) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      this.sagaRepository.assign(res.data, rest);
      await this.sagaRepository.persistAndFlush(res.data);

      return {
        status: HttpStatus.OK,
        data: res.data,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }

  async remove(id: string, agent: IAgent) {
    try {
      const res = await this.findOne(id, agent);
      if (!res.data) return res as ResponseDto;

      // creator | DELETE_ANY_SAGA
      if (
        res.data.creator.id !== agent.id &&
        !agent.role?.privileges.includes(Privilege.DELETE_ANY_SAGA)
      ) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      await this.sagaRepository.nativeDelete(id);

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
