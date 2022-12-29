import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Privilege } from 'src/workspaces/interfaces/workspace.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { CreateAgentDto } from './dto/create-invoice.dto';
import { GetAgentsDto } from './dto/get-invoices.dto';
import { UpdateAgentDto } from './dto/update-invoice.dto';
import { Agent } from './entities/invoice.entity';
import { IAgent } from './interfaces/agent.interface';

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);

  constructor(
    @InjectRepository(Agent)
    private agentRepository: EntityRepository<Agent>,
  ) {}

  async create(createAgentDto: CreateAgentDto, agent: Agent) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { role, wid, userId, ...rest } = createAgentDto;

      const exists = await this.agentRepository.findOne({ userId });
      if (exists) {
        return {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: [
            {
              field: 'userId',
              message: `Agent allready exists`,
            },
          ],
        };
      }

      const data = new Agent(rest);
      data.workspace = agent.workspace;

      if (role) {
        if (!agent.workspace?.roles.some((r) => r.name === role)) {
          return {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: [
              {
                field: 'role',
                message: `Role ${role} not in use`,
              },
            ],
          };
        }

        data.role = role;
      }

      await this.agentRepository.flush();

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

  async findAll({ limit, offset, wid, ...rest }: GetAgentsDto, agent?: IAgent) {
    const _where = { workspace: wid };

    // creator | READ_ANY_AGENT
    if (agent && !agent.hasPrivilege(Privilege.READ_ANY_AGENT)) {
      _where['id'] = agent.id;
    }

    const where = Object.keys(rest).reduce((acc, key) => {
      if (!(Agent.isSearchable(key) && rest[key])) return acc;
      acc[key] = rest[key];
      return acc;
    }, _where);

    const [items, total] = await this.agentRepository.findAndCount(where, {
      populate: agent ? null : ['workspace'],
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

  async findOne(id: string, agent: IAgent) {
    const data = await this.agentRepository.findOne(id);

    if (!data) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    // creator | READ_ANY_AGENT
    if (data.id !== agent.id && !agent.hasPrivilege(Privilege.READ_ANY_AGENT)) {
      return {
        status: HttpStatus.FORBIDDEN,
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      data,
    };
  }

  async update(updateAgentDto: UpdateAgentDto, agent: IAgent) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, role, wid, ...rest } = updateAgentDto;
      const res = await this.findOne(id, agent);
      if (!res.data) return res as ResponseDto;

      // himself | EDIT_ANY_AGENT
      if (
        res.data.id !== agent.id &&
        !agent.hasPrivilege(Privilege.EDIT_ANY_AGENT)
      ) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      this.agentRepository.assign(res.data, rest);

      if (role) {
        if (!agent.workspace?.roles.some((r) => r.name === role)) {
          return {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: [
              {
                field: 'role',
                message: `Role ${role} hot in use`,
              },
            ],
          };
        }

        res.data.role = role;
      }

      await this.agentRepository.flush();

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

  async remove(id: string, agent: IAgent) {
    try {
      const res = await this.findOne(id, agent);
      if (!res.data) return res as ResponseDto;

      // himself | DELETE_ANY_AGENT
      if (
        res.data.id !== agent.id &&
        !agent.hasPrivilege(Privilege.DELETE_ANY_AGENT)
      ) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      await this.agentRepository.nativeDelete(id);

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
