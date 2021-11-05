import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { IAgent } from 'src/agents/interfaces/agent.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { ObjectID, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { GetRolesDto } from './dto/get-roles.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create({ wid: workspaceId, ...rest }: CreateRoleDto) {
    try {
      const role = this.roleRepository.create({ ...rest, workspaceId });
      const data = await this.roleRepository.save(role);
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

  async findAll({ limit, offset, wid, ...rest }: GetRolesDto) {
    const where = { workspaceId: wid };

    const [items, total] = await this.roleRepository.findAndCount({
      where: Object.keys(rest).reduce((acc, key) => {
        if (!(Role.isSearchable(key) && rest[key])) return acc;
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
    const item = await this.roleRepository.findOne(id);

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

  async update({ id, ...rest }: UpdateRoleDto, agent: IAgent) {
    try {
      const res = await this.findOne(id);
      if (!res.data) return res as ResponseDto;

      // should no edit own role
      if (res.data.id === agent.id) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      await this.roleRepository.update(id, rest);

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

      // should no delete own role
      if (res.data.id === agent.id) {
        return {
          status: HttpStatus.FORBIDDEN,
          data: null,
        };
      }

      const deleted = await this.roleRepository.delete(id);

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
