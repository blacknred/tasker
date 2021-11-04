import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { IAgent } from 'src/agents/interfaces/agent.interface';
import { Task } from 'src/tasks/entities/task.entity';
import { Privilege } from 'src/roles/role.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { Connection, ObjectID, Repository } from 'typeorm';
import { SAGA_REPOSITORY } from './consts';
import { CreateSagaDto } from './dto/create-saga.dto';
import { GetSagasDto } from './dto/get-sagas.dto';
import { UpdateSagaDto } from './dto/update-saga.dto';
import { Saga } from './entities/saga.entity';

@Injectable()
export class SagasService {
  private readonly logger = new Logger(SagasService.name);

  constructor(
    @Inject(SAGA_REPOSITORY) private sagaRepository: Repository<Saga>,
    private connection: Connection,
  ) {}

  async create(createSagaDto: CreateSagaDto, agent: IAgent) {
    try {
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

  async findAll({ limit, offset, ...rest }: GetSagasDto, agent: IAgent) {
    const where = { workspaceId: agent.workspaceId };

    if (!agent.role.privileges.includes(Privilege.READ_ANY_SAGA)) {
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

    if (
      saga.creator.id !== agent.id &&
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
        res.data.creator.id !== agent.id &&
        !agent.role.privileges.includes(Privilege.EDIT_ANY_SAGA)
      ) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      const updatedSaga = Object.assign(res.data, rest);
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
        res.data.creator.id !== agent.id &&
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

        await sagaRepo.delete(id);
        await taskRepo.updateMany(
          { sagaIds: id },
          { $unset: { 'sagaIds.$': 1 } },
        );
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
