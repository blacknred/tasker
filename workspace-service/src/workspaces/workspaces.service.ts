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
    private roleRepository: EntityRepository<Role>,
    @InjectRepository(Agent)
    private agentRepository: EntityRepository<Agent>,
    @InjectRepository(Task)
    private taskRepository: EntityRepository<Task>,
    @InjectRepository(Saga)
    private sagaRepository: EntityRepository<Saga>,
  ) {}

  async create({ userId, userName, userImage, ...rest }: CreateWorkspaceDto) {
    try {
      // workspace
      const workspace = new Workspace({ creatorId: userId, ...rest });
      await this.workspaceRepository.persistAndFlush(workspace);

      // base workspace roles
      const admin = new Role({ name: BaseRole.ADMIN, wid: workspace._id });
      const worker = new Role({ name: BaseRole.WORKER, wid: workspace._id });
      admin.privileges = Object.values(Privilege);
      await this.roleRepository.persistAndFlush([admin, worker]);

      // initial workspace agents
      await this.agentRepository.persistAndFlush([
        new Agent({
          wid: workspace._id,
          role: admin,
          name: userName,
          image: userImage,
          userId,
        }),
        new Agent({
          wid: workspace._id,
          role: worker,
          name: 'test worker',
          userId: 111111111,
        }),
      ]);

      return {
        status: HttpStatus.CREATED,
        data: workspace,
      };
    } catch (e) {
      console.log(e);

      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }

  async findAll({ limit, offset, uid, ...rest }: GetWorkspacesDto) {
    const _where = {};

    if (uid) {
      const wids = await this.agentRepository.find({ userId: uid });
      _where['id'] = wids.map((w) => w.wid);
    }

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

    data.agent = agent;

    return {
      status: HttpStatus.OK,
      data,
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

      this.workspaceRepository.assign(res.data, rest);
      await this.workspaceRepository.persistAndFlush(res.data);

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
      await this.taskRepository.nativeDelete({ wid: id });
      // await this.roleRepository.nativeDelete({ wid: id });
      // await this.agentRepository.nativeDelete({ wid: id });
      // await this.sagaRepository.nativeDelete({ wid: id });

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
