import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from 'src/agents/entities/agent.entity';
import { IAgent } from 'src/agents/interfaces/agent.interface';
import { BaseRole, Privilege } from 'src/roles/interfaces/role.interface';
import { Saga } from 'src/sagas/entities/saga.entity';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { Connection, ObjectID, Repository } from 'typeorm';
import { Role } from '../roles/entities/role.entity';
import { Task } from '../tasks/entities/task.entity';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { GetWorkspacesDto } from './dto/get-workspaces.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Workspace } from './entities/workspace.entity';

@Injectable()
export class WorkspacesService {
  private readonly logger = new Logger(WorkspacesService.name);

  constructor(
    private connection: Connection,
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
  ) {}

  async create({ userId, userName, avatar, ...rest }: CreateWorkspaceDto) {
    try {
      let data;

      await this.connection.transaction(async (manager) => {
        // workspace
        data = await manager.save(
          new Workspace({
            creatorId: userId,
            ...rest,
          }),
        );

        data.id = data.id?.toString() as unknown as ObjectID;

        // base workspace roles
        const admin = await manager.save(
          new Role({
            privileges: Object.values(Privilege),
            name: BaseRole.ADMIN,
            workspaceId: data.id,
          }),
        );

        const worker = await manager.save(
          new Role({
            name: BaseRole.WORKER,
            workspaceId: data.id,
          }),
        );

        // initial workspace agents
        await manager.save(
          new Agent({
            role: admin,
            userName,
            avatar,
            userId,
          }),
        );

        await manager.save(
          new Agent({
            role: worker,
            userName: 'test worker',
            userId: 111111111,
          }),
        );
      });

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
        items: items.slice(0, limit),
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
        !agent.role?.privileges.includes(Privilege.EDIT_WORKSPACE)
      ) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

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
        await manager.delete(Task, { workspace: id });
        await manager.delete(Saga, { workspace: id });
        await manager.delete(Agent, { workspace: id });
        await manager.delete(Role, { workspace: id });
        await manager.delete(Workspace, { id });
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
