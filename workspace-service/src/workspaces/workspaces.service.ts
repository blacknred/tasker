import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Agent } from 'src/agents/entities/agent.entity';
import { IAgent } from 'src/agents/interfaces/agent.interface';
import { Saga } from 'src/sagas/entities/saga.entity';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { Connection, MongoRepository, ObjectID } from 'typeorm';
import { Task } from '../tasks/entities/task.entity';
import { WORKSPACE_REPOSITORY } from './consts';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { GetWorkspacesDto } from './dto/get-workspaces.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Admin, Role } from '../roles/entities/role.entity';
import { Workspace } from './entities/workspace.entity';
import { Privilege } from '../roles/role.interface';

@Injectable()
export class WorkspacesService {
  private readonly logger = new Logger(WorkspacesService.name);

  constructor(
    @Inject(WORKSPACE_REPOSITORY)
    private workspaceRepository: MongoRepository<Workspace>,
    private connection: Connection,
  ) {}

  async create({ userId, userName, ...rest }: CreateWorkspaceDto) {
    try {
      let workspace = await this.workspaceRepository.create(rest);
      workspace.creatorId = userId;
      const agent = new Agent({ userId, userName, role: Admin });

      await this.connection.transaction(async (manager) => {
        workspace = await manager.save(workspace);
        await manager.save(agent);
      });

      return {
        status: HttpStatus.CREATED,
        data: {
          ...workspace,
          id: workspace.id?.toString() as unknown as ObjectID,
        },
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

  async findOne(id: ObjectID, agent?: IAgent) {
    const workspace = await this.workspaceRepository.findOne(id);

    if (!workspace) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      data: { ...workspace, agent },
    };
  }

  async update({ id, ...rest }: UpdateWorkspaceDto, agent: IAgent) {
    try {
      const res = await this.findOne(id);
      if (!res.data) return res as ResponseDto;

      // creator | EDIT_WORKSPACE
      if (
        res.data.creatorId !== agent.userId &&
        !agent.role.privileges.includes(Privilege.EDIT_WORKSPACE)
      ) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      rest.roles = rest.roles.map((role) => new Role(role));
      rest.roles[0].
      await this.workspaceRepository.update(id, rest);

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

  async remove(id: ObjectID, userId: number) {
    try {
      const res = await this.findOne(id);
      if (!res.data) return res as ResponseDto;

      // creator
      if (res.data.creatorId !== userId) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      await this.connection.transaction(async (manager) => {
        const workspaceRepo = manager.getMongoRepository(Workspace);
        const agentRepo = manager.getMongoRepository(Agent);
        const sagaRepo = manager.getMongoRepository(Saga);
        const taskRepo = manager.getMongoRepository(Task);

        await agentRepo.deleteMany({ workspaceId: id });
        await sagaRepo.deleteMany({ workspaceId: id });
        await taskRepo.deleteMany({ workspaceId: id });
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
