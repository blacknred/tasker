import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Privilege } from 'src/workspaces/interfaces/role.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { MongoRepository, ObjectID } from 'typeorm';
import { AGENT_REPOSITORY } from './consts';
import { CreateAgentDto } from './dto/create-agent.dto';
import { GetAgentsDto } from './dto/get-agents.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent } from './entities/agent.entity';
import { IAgent } from './interfaces/agent.interface';

@Injectable()
export class AgentsService {
  private readonly logger = new Logger(AgentsService.name);

  constructor(
    @Inject(AGENT_REPOSITORY)
    private agentRepository: MongoRepository<Agent>,
  ) {}

  async create(createAgentDto: CreateAgentDto) {
    try {
      const item = this.agentRepository.create(createAgentDto);
      const data = await this.agentRepository.save(item);
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

  async findAll({ limit, offset, ...rest }: GetAgentsDto, agent: IAgent) {
    const where = { workspaceId: agent.workspaceId };

    if (!agent.role.privileges.includes(Privilege.READ_ANY_AGENT)) {
      where['creator.id'] = agent.id;
    }

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

  async findOne(id: ObjectID, agent: IAgent) {
    const item = await this.agentRepository.findOne(id);

    if (!item) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    if (
      item.id !== agent.id &&
      !agent.role.privileges.includes(Privilege.READ_ANY_AGENT)
    ) {
      return {
        status: HttpStatus.FORBIDDEN,
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      data: item,
    };
  }

  async findOneExtended(wid: ObjectID, uid: number): Promise<Agent> {
    return this.agentRepository.findOne({ workspaceId: wid, userId: uid });
    // .aggregate<Agent>([
    //   { $unwind: '$agents' },
    //   { $match: { _id: id, 'agents.userId': userId } },
    //   //   { $unwind: '$roles' },
    //   //   { $lookup: {
    //   //     from: "sivaUserInfo",
    //   //     localField: "userId",
    //   //     foreignField: "userId",
    //   //     as: "userInfo"
    //   // }
    //   // { $project: { _id: 0, "products.productID": 1 } }
    //   // $group: {
    //   //   _id: {
    //   //     country: '$address.country',
    //   //   },
    //   // },
    // ])
    // .toArray()[0];
  }

  async update({ id, ...rest }: UpdateAgentDto, agent: IAgent) {
    try {
      const res = await this.findOne(id, agent);
      if (!res.data) return res as ResponseDto;

      if (
        res.data.id !== agent.id &&
        !agent.role.privileges.includes(Privilege.EDIT_ANY_AGENT)
      ) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      const updatedAgent = Object.assign(res.data, rest);
      await this.agentRepository.update(id, updatedAgent);

      return {
        status: HttpStatus.OK,
        data: updatedAgent,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }

  async remove(id: ObjectID, agent: IAgent) {
    try {
      const res = await this.findOne(id, agent);
      if (!res.data) return res as ResponseDto;

      if (
        res.data.id !== agent.id &&
        !agent.role.privileges.includes(Privilege.DELETE_ANY_AGENT)
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
