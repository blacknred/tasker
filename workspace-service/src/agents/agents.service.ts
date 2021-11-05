import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Privilege } from 'src/roles/interfaces/role.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { ObjectID, Repository } from 'typeorm';
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
    private agentRepository: Repository<Agent>,
  ) {}

  async create({ wid: workspaceId, ...rest }: CreateAgentDto) {
    try {
      const agent = this.agentRepository.create({ ...rest, workspaceId });
      const data = await this.agentRepository.save(agent);
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

  async findAll({ limit, offset, wid, ...rest }: GetAgentsDto) {
    const where = { workspaceId: wid };

    const [items, total] = await this.agentRepository.findAndCount({
      where: Object.keys(rest).reduce((acc, key) => {
        if (!(Agent.isSearchable(key) && rest[key])) return acc;
        acc[key] = rest[key];
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

  async findOne(id: ObjectID) {
    const item = await this.agentRepository.findOne(id);

    if (!item) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      data: item,
    };
  }

  async update({ id, ...rest }: UpdateAgentDto, agent: IAgent) {
    try {
      const res = await this.findOne(id);
      if (!res.data) return res as ResponseDto;

      if (
        res.data.id !== agent.id &&
        !agent.role?.privileges.includes(Privilege.MANAGE_AGENT)
      ) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      await this.agentRepository.update(id, rest);

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

  async remove(id: ObjectID, agent: IAgent) {
    try {
      const res = await this.findOne(id);
      if (!res.data) return res as ResponseDto;

      if (
        res.data.id !== agent.id &&
        !agent.role?.privileges.includes(Privilege.MANAGE_AGENT)
      ) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      const deleted = await this.agentRepository.delete(id);

      if (!deleted.affected) {
        return {
          status: HttpStatus.CONFLICT,
          data: null,
        };
      }

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
