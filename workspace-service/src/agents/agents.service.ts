import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Role } from 'src/roles/entities/role.entity';
import { Privilege } from 'src/roles/interfaces/role.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { CreateAgentDto } from './dto/create-agent.dto';
import { GetAgentsDto } from './dto/get-agents.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent } from './entities/agent.entity';
import { IAgent } from './interfaces/agent.interface';

@Injectable()
export class AgentsService {
  private readonly logger = new Logger(AgentsService.name);

  constructor(
    @InjectRepository(Agent)
    private agentRepository: EntityRepository<Agent>,
    @InjectRepository(Role)
    private roleRepository: EntityRepository<Role>,
  ) {}

  async create({ roleId, ...rest }: CreateAgentDto, agent: Agent) {
    try {
      const data = new Agent(rest);
      data.wid = agent.wid;
      if (roleId) {
        data.role = await this.roleRepository.findOne(roleId);
      }

      await this.agentRepository.persistAndFlush(data);

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

  async findAll({ limit, offset, wid, ...rest }: GetAgentsDto) {
    const _where = { wid };
    const where = Object.keys(rest).reduce((acc, key) => {
      if (!(Agent.isSearchable(key) && rest[key])) return acc;
      acc[key] = rest[key];
      return acc;
    }, _where);

    const [items, total] = await this.agentRepository.findAndCount(where, {
      populate: ['role'],
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

  async findOne(id: string) {
    const data = await this.agentRepository.findOne(id);

    if (!data) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      data,
    };
  }

  async update({ id, roleId, ...rest }: UpdateAgentDto, agent: IAgent) {
    try {
      const res = await this.findOne(id);
      if (!res.data) return res as ResponseDto;

      // himself | MANAGE_AGENT
      if (
        res.data.id !== agent.id &&
        !agent.role?.privileges.includes(Privilege.MANAGE_AGENT)
      ) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      this.agentRepository.assign(res.data, rest);
      if (roleId) {
        res.data.role = await this.roleRepository.findOne(roleId);
      }
      await this.agentRepository.persistAndFlush(res.data);

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
      const res = await this.findOne(id);
      if (!res.data) return res as ResponseDto;

      // himself | MANAGE_AGENT
      if (
        res.data.id !== agent.id &&
        !agent.role?.privileges.includes(Privilege.MANAGE_AGENT)
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
