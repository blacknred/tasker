import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Agent } from 'src/workspaces/entities/agent.entity';
import { ObjectID, Repository } from 'typeorm';
import { SAGA_REPOSITORY } from './consts';
import { CreateSagaDto } from './dto/create-saga.dto';
import { Saga } from './entities/saga.entity';

@Injectable()
export class SagasService {
  private readonly logger = new Logger(SagasService.name);

  constructor(
    @Inject(SAGA_REPOSITORY) private sagaRepository: Repository<Saga>,
  ) {}

  private hasColumn(key: string) {
    return this.sagaRepository.metadata.hasColumnWithPropertyPath(key);
  }

  async create(createSagaDto: CreateSagaDto) {
    try {
      const saga = this.sagaRepository.create(createSagaDto);
      saga.creator = new Agen;
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

  // async findAll({ limit, offset, ...rest }: GetTasksDto) {
  //   const [tasks, total] = await this.sagaRepository.findAndCount({
  //     where: Object.keys(rest).reduce((acc, key) => {
  //       if (!(this.hasColumn(key) && rest[key])) return acc;
  //       acc[key] = rest[key];
  //       return acc;
  //     }, {}),
  //     order: { [rest['sort.field'] || 'id']: rest['sort.order'] || 'ASC' },
  //     skip: +offset,
  //     take: +limit + 1,
  //   });

  //   return {
  //     status: HttpStatus.OK,
  //     data: {
  //       hasMore: tasks.length === +limit + 1,
  //       items: tasks.slice(0, limit),
  //       total,
  //     },
  //   };
  // }

  async findOne(id: ObjectID, agent: Agent) {
    const saga = await this.sagaRepository.findOne(id);

    if (!saga) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    if (saga.workspaceId !== agent. && task.userId !== userId) {
      return {
        status: HttpStatus.FORBIDDEN,
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      data: task,
    };
  }

  // async update(id: ObjectID, updateTaskDto: UpdateTaskDto) {
  //   try {
  //     const res = await this.findOne(id, updateTaskDto.userId);
  //     if (!res.data) return res as ResponseDto;

  //     const updatedTask = Object.assign(res.data, updateTaskDto) as Task;
  //     await this.sagaRepository.update(id, updateTaskDto);

  //     return {
  //       status: HttpStatus.OK,
  //       data: updatedTask,
  //     };
  //   } catch (e) {
  //     throw new RpcException({
  //       status: HttpStatus.PRECONDITION_FAILED,
  //     });
  //   }
  // }

  // async remove(id: ObjectID, userId: number) {
  //   try {
  //     const res = await this.findOne(id, userId);
  //     if (!res.data) return res as ResponseDto;

  //     const deleted = await this.sagaRepository.delete(id);

  //     if (!deleted.affected) {
  //       return {
  //         status: HttpStatus.CONFLICT,
  //         data: null,
  //       };
  //     }

  //     return {
  //       status: HttpStatus.OK,
  //       data: null,
  //     };
  //   } catch (e) {
  //     throw new RpcException({
  //       status: HttpStatus.PRECONDITION_FAILED,
  //     });
  //   }
  // }
}
