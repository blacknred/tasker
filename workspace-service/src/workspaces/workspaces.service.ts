import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Saga } from 'src/sagas/entities/saga.entity';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { Connection, MongoRepository, ObjectID } from 'typeorm';
import { Task } from '../tasks/entities/task.entity';
import { WORKSPACE_REPOSITORY } from './consts';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { GetWorkspacesDto } from './dto/get-workspaces.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Agent } from './entities/agent.entity';
import { Admin } from './entities/role.entity';
import { Workspace } from './entities/workspace.entity';
import { IAgent } from './interfaces/agent.interface';
import { IRole, Privilege } from './interfaces/role.interface';
import { IWorkspace } from './interfaces/workspace.interface';

@Injectable()
export class WorkspacesService {
  private readonly logger = new Logger(WorkspacesService.name);

  constructor(
    @Inject(WORKSPACE_REPOSITORY)
    private workspaceRepository: MongoRepository<Workspace>,
    private connection: Connection,
  ) {}

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

  async create({ userId, userName, ...rest }: CreateWorkspaceDto) {
    try {
      const workspace = this.workspaceRepository.create(rest);
      const agent = new Agent({ userId, userName, role: Admin });
      workspace.agents.push(agent);
      workspace.creatorId = userId;

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

  async findAll({ limit, offset, userId, ...rest }: GetWorkspacesDto) {
    const where = userId ? { 'agents.userId': { $eq: userId } } : {};

    const [items, total] = await this.workspaceRepository.findAndCount({
      where: Object.keys(rest).reduce((acc, key) => {
        if (!(Workspace.isSearchable(key) && rest[key])) return acc;
        acc[key] = { $eq: rest[key] };
        return acc;
      }, where),
      order: { [rest['sort.field'] || 'id']: rest['sort.order'] || 'ASC' },
      skip: +offset,
      take: +limit + 1,
    });

    return {
      status: HttpStatus.OK,
      data: {
        hasMore: items.length === +limit + 1,
        items: items.slice(0, limit).map((item) => ({
          me: this.findAgent(item.id, userId),
          ...item,
        })),
        total,
      },
    };
  }

  async findOne(id: ObjectID, me?: IAgent) {
    const workspace = await this.workspaceRepository.findOne(id);

    if (!workspace) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      data: me ? { ...workspace, me } : workspace,
    };
  }

  async update({ id, ...rest }: UpdateWorkspaceDto, role: IRole) {
    try {
      const res = await this.findOne(id);
      if (!res.data) return res as ResponseDto;

      if (!role.privileges.includes(Privilege.EDIT_WORKSPACE)) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      const updatedTask = Object.assign(res.data, rest) as IWorkspace;
      await this.workspaceRepository.update(id, rest);

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
      const res = await this.findOne(id);
      if (!res.data) return res as ResponseDto;

      if (res.data.creatorId !== userId) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      await this.connection.transaction(async (manager) => {
        const workspaceRepo = manager.getMongoRepository(Workspace);
        const sagaRepo = manager.getMongoRepository(Saga);
        const taskRepo = manager.getMongoRepository(Task);

        await taskRepo.deleteMany({ workspaceId: id });
        await sagaRepo.deleteMany({ workspaceId: id });
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
