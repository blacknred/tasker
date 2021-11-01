import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  ObjectID,
  Repository,
  MongoRepository,
  AggregationCursor,
  Connection,
} from 'typeorm';
import {
  TASK_REPOSITORY,
  WORKER_SERVICE,
  WORKSPACE_REPOSITORY,
} from './consts';
import { CreateTaskDto, CreateWorkspaceDto } from './dto/create-workspace.dto';
import { GetTasksDto } from './dto/get-workspaces.dto';
import { ResponseDto } from './dto/response.dto';
import { UpdateTaskDto } from './dto/update-workspace.dto';
import { Task } from '../tasks/entities/task.entity';
import { Workspace } from './entities/workspace.entity';
import { IRole } from './interfaces/role.interface';
import { Agent } from './entities/agent.entity';
import { Admin } from './entities/role.entity';
import { Saga } from 'src/sagas/entities/saga.entity';

@Injectable()
export class WorkspacesService {
  private readonly logger = new Logger(WorkspacesService.name);

  constructor(
    @Inject(WORKSPACE_REPOSITORY)
    private workspaceRepository: MongoRepository<Workspace>,
    private connection: Connection,
  ) {}

  private hasColumn(key: string) {
    return this.workspaceRepository.metadata.hasColumnWithPropertyPath(key);
  }

  async findAgent(id: ObjectID, userId: number): Promise<Agent> {
    return this.workspaceRepository
      .aggregate<Agent>([
        { $unwind: '$agents' },
        { $match: { _id: id, 'agents.userId': userId } },
        //   { $unwind: '$roles' },
        //   { $lookup: {
        //     from: "sivaUserInfo",
        //     localField: "userId",
        //     foreignField: "userId",
        //     as: "userInfo"
        // }
        // { $project: { _id: 0, "products.productID": 1 } }
        // $group: {
        //   _id: {
        //     country: '$address.country',
        //   },
        // },
      ])
      .toArray()[0];
  }

  //

  async create({ creator, ...rest }: CreateWorkspaceDto) {
    try {
      const workspace = this.workspaceRepository.create(rest);

      workspace.agents.push(new Agent({ ...creator, role: Admin }));
      workspace.creatorId = creator.userId;

      const data = await this.workspaceRepository.save(workspace);
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

  async findAll({ limit, offset, ...rest }: GetTasksDto) {
    const [tasks, total] = await this.workspaceRepository.findAndCount({
      where: Object.keys(rest).reduce((acc, key) => {
        if (!(this.hasColumn(key) && rest[key])) return acc;
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

  async findOne(id: ObjectID, userId: number) {
    const task = await this.workspaceRepository.findOne(id);

    if (!task) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    if (userId != null && task.userId !== userId) {
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

  async update(id: ObjectID, updateTaskDto: UpdateTaskDto) {
    try {
      const res = await this.findOne(id, updateTaskDto.userId);
      if (!res.data) return res as ResponseDto;

      const updatedTask = Object.assign(res.data, updateTaskDto) as Task;
      await this.workspaceRepository.update(id, updateTaskDto);
      // this.workerService.emit('new-task', data);
      return {
        status: HttpStatus.OK,
        data: updatedTask,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }

  async remove(id: ObjectID, userId: number) {
    try {
      // const res = await this.findOne(id, userId);
      // if (!res.data) return res as ResponseDto;
      // if (res.data.creatorId !== userId) {
      //   return {
      //     status: HttpStatus.FORBIDDEN,
      //     data: null,
      //   };
      // }

      await this.connection.transaction(async (manager) => {
        const workspaceRepo = manager.getMongoRepository(Workspace);
        const sagaRepo = manager.getMongoRepository(Saga);
        const taskRepo = manager.getMongoRepository(Task);

        await taskRepo.delete({ workspaceId: id });
        await sagaRepo.delete({ workspaceId: id });
        await workspaceRepo.delete(id);
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
