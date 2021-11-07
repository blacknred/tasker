import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { IAgent } from 'src/agents/interfaces/agent.interface';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { GetRolesDto } from './dto/get-roles.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  constructor(
    @InjectRepository(Role)
    private roleRepository: EntityRepository<Role>,
  ) {}

  async create({ wid: workspaceId, ...rest }: CreateRoleDto) {
    try {
      const data = new Role({ ...rest, workspaceId });
      await this.roleRepository.persist(data);

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
    const _where = { workspaceId: wid };
    const where = Object.keys(rest).reduce((acc, key) => {
      if (!(Role.isSearchable(key) && rest[key])) return acc;
      acc[key] = rest[key];
      return acc;
    }, _where);

    const [items, total] = await this.roleRepository.findAndCount(where, {
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
    const data = await this.roleRepository.findOne(id);

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

      await this.roleRepository.nativeUpdate(id, rest);

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

  async remove(id: string, agent: IAgent) {
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

      await this.roleRepository.nativeDelete(id);

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
