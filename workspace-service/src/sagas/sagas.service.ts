import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SAGA_REPOSITORY } from './consts';
import { Saga } from './entities/saga.entity';

@Injectable()
export class SagasService {
  private readonly logger = new Logger(SagasService.name);

  constructor(
    @Inject(SAGA_REPOSITORY) private sagaRepository: Repository<Saga>,
  ) {}

  // private hasColumn(key: string) {
  //   return this.sagaRepository.metadata.hasColumnWithPropertyPath(key);
  // }

  // async create(createTaskDto: CreateTaskDto) {
  //   try {
  //     const task = this.sagaRepository.create(createTaskDto);
  //     const data = await this.sagaRepository.save(task);
  //     data.id = data.id.toString() as unknown as ObjectID;

  //     this.workerService.emit('new-task', data);

  //     return {
  //       status: HttpStatus.CREATED,
  //       data,
  //     };
  //   } catch (e) {
  //     throw new RpcException({
  //       status: HttpStatus.PRECONDITION_FAILED,
  //     });
  //   }
  // }

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

  // async findOne(id: ObjectID, userId: number) {
  //   const task = await this.sagaRepository.findOne(id);

  //   if (!task) {
  //     return {
  //       status: HttpStatus.NOT_FOUND,
  //       data: null,
  //     };
  //   }

  //   if (userId != null && task.userId !== userId) {
  //     return {
  //       status: HttpStatus.FORBIDDEN,
  //       data: null,
  //     };
  //   }

  //   return {
  //     status: HttpStatus.OK,
  //     data: task,
  //   };
  // }

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
