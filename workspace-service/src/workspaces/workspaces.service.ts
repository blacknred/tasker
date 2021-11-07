import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Agent } from 'src/agents/entities/agent.entity';
import { IAgent } from 'src/agents/interfaces/agent.interface';
import { BaseRole, Privilege } from 'src/roles/interfaces/role.interface';
import { Saga } from 'src/sagas/entities/saga.entity';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
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
    @InjectRepository(Workspace)
    private workspaceRepository: EntityRepository<Workspace>,
    @InjectRepository(Role)
    private agentRepository: EntityRepository<Agent>,
    @InjectRepository(Agent)
    private roleRepository: EntityRepository<Role>,
    @InjectRepository(Task)
    private taskRepository: EntityRepository<Task>,
    @InjectRepository(Saga)
    private sagaRepository: EntityRepository<Saga>,
  ) {}

  async create({ userId, userName, avatar, ...rest }: CreateWorkspaceDto) {
    try {
      // workspace
      const data = new Workspace({ creatorId: userId, ...rest });
      await this.workspaceRepository.persistAndFlush(data);

      // base workspace roles
      const roles = [
        new Role({
          privileges: Object.values(Privilege),
          name: BaseRole.ADMIN,
          workspaceId: data.id,
        }),
        new Role({
          name: BaseRole.WORKER,
          workspaceId: data.id,
        }),
      ];

      await this.roleRepository.persistAndFlush(roles);

      // initial workspace agents
      const agents = [
        new Agent({
          workspaceId: data.id,
          role: roles[0],
          userName,
          avatar,
          userId,
        }),
        new Agent({
          workspaceId: data.id,
          userName: 'test worker',
          userId: 111111111,
          role: roles[1],
        }),
      ];

      await this.agentRepository.persistAndFlush(agents);

      return {
        status: HttpStatus.CREATED,
        data,
      };
    } catch (e) {
      console.log(e);

      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }

  async findAll({ limit, offset, userId, ...rest }: GetWorkspacesDto) {
    const _where = userId ? { 'agents.userId': { $eq: userId } } : {};
    const where = Object.keys(rest).reduce((acc, key) => {
      if (!(Workspace.isSearchable(key) && rest[key])) return acc;
      acc[key] = { $eq: rest[key] };
      return acc;
    }, _where);

    const [items, total] = await this.workspaceRepository.findAndCount(where, {
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

  async findOne(id: string, agent?: IAgent) {
    const data = await this.workspaceRepository.findOne(id);

    if (!data) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      data: { ...data, agent },
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

      await this.workspaceRepository.nativeUpdate(id, rest);

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

  async remove(id: string, userId: number) {
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

      await this.workspaceRepository.nativeDelete({ id });
      await this.taskRepository.nativeDelete({ workspace: id });
      await this.sagaRepository.nativeDelete({ workspace: id });
      await this.agentRepository.nativeDelete({ workspace: id });
      await this.roleRepository.nativeDelete({ workspace: id });

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
