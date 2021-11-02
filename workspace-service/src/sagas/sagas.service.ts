import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Task } from 'src/tasks/entities/task.entity';
import { IAgent } from 'src/workspaces/interfaces/agent.interface';
import { Privilege } from 'src/workspaces/interfaces/role.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { Connection, ObjectID, Repository } from 'typeorm';
import { SAGA_REPOSITORY } from './consts';
import { CreateSagaDto } from './dto/create-saga.dto';
import { GetSagasDto } from './dto/get-sagas.dto';
import { UpdateSagaDto } from './dto/update-saga.dto';
import { Saga } from './entities/saga.entity';
import { ISaga } from './interfaces/saga.interface';

@Injectable()
export class SagasService {
  private readonly logger = new Logger(SagasService.name);

  constructor(
    @Inject(SAGA_REPOSITORY) private sagaRepository: Repository<Saga>,
    private connection: Connection,
  ) {}

  async create(createSagaDto: CreateSagaDto, agent: IAgent) {
    try {
      if (!agent.role.privileges.includes(Privilege.CREATE_SAGA)) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      const saga = this.sagaRepository.create(createSagaDto);
      saga.creator = agent;
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

  async findAll({ limit, offset, ...rest }: GetSagasDto) {
    const [tasks, total] = await this.sagaRepository.findAndCount({
      where: Object.keys(rest).reduce((acc, key) => {
        if (!(Saga.searchable.includes(key) && rest[key])) return acc;
        acc[key] = rest[key];
        return acc;
      }, {}),
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

    if (
      saga.creator !== agent &&
      !agent.role.privileges.includes(Privilege.READ_ANY_SAGA)
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
        res.data.creator !== agent &&
        !agent.role.privileges.includes(Privilege.EDIT_ANY_SAGA)
      ) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      const updatedSaga = Object.assign(res.data, rest) as ISaga;
      await this.sagaRepository.update(id, updatedSaga);

      return {
        status: HttpStatus.OK,
        data: updatedSaga,
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
        res.data.creator !== agent &&
        !agent.role.privileges.includes(Privilege.DELETE_ANY_SAGA)
      ) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      await this.connection.transaction(async (manager) => {
        const sagaRepo = manager.getMongoRepository(Saga);
        const taskRepo = manager.getMongoRepository(Task);

        await taskRepo.deleteMany({ sagaIds: [id] });
        await sagaRepo.delete(id);
      });

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
