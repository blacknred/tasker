import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcryptjs';
import { classToPlain } from 'class-transformer';
import { Repository } from 'typeorm';
import { USER_REPOSITORY } from './consts';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { ResponseDto } from './dto/response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
  ) {}

  private fieldMapper<T>(obj: T, isPartial?: boolean): Partial<T> {
    return Object.keys(classToPlain(obj)).reduce((o, k) => {
      if (!isPartial || User.isNotSecured(k)) o[k] = obj[k];
      return o;
    }, {});
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const param = { email: createUserDto.email };
      const inUse = await this.userRepository.findOne(param, {
        withDeleted: true,
      });

      if (inUse) {
        return {
          status: HttpStatus.CONFLICT,
          errors: [
            {
              message: 'Email already in use',
              field: 'email',
            },
          ],
        };
      }

      // const salt = this.configService.get('SECRET');
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);

      return {
        status: HttpStatus.CREATED,
        data: user,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }

  async findAll({ limit, offset, partial, ...rest }: GetUsersDto) {
    const [items, total] = await this.userRepository.findAndCount({
      where: Object.keys(rest).reduce((acc, key) => {
        if (!(User.isSearchable(key) && rest[key])) return acc;
        acc[key] = rest[key];
        return acc;
      }, {}),
      order: { [rest['sort.field'] || 'id']: rest['sort.order'] || 'ASC' },
      skip: offset,
      take: limit + 1,
      withDeleted: !partial,
    });

    return {
      status: HttpStatus.OK,
      data: {
        hasMore: items.length === limit + 1,
        items: items.slice(0, limit).map((i) => this.fieldMapper(i, partial)),
        total,
      },
    };
  }

  async findOne(id: number, partial?: boolean, withDeleted?: boolean) {
    const data = await this.userRepository.findOne(id, { withDeleted });

    if (!data) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      data: this.fieldMapper(data, partial),
    };
  }

  async findOneValidated({ email, password }: GetUserDto) {
    try {
      const user = await this.userRepository.findOne(
        { email },
        { withDeleted: false },
      );

      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          errors: [
            {
              message: 'Email not in use',
              field: 'email',
            },
          ],
        };
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          errors: [
            {
              message: 'Wrong password',
              field: 'password',
            },
          ],
        };
      }

      return {
        status: HttpStatus.OK,
        data: user,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }

  async update({ id, ...rest }: UpdateUserDto) {
    try {
      const res = await this.findOne(id);
      if (!res.data) return res;

      await this.userRepository.update(id, rest);

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

  async remove(id: number) {
    try {
      const res = await this.findOne(id);
      if (!res.data) return res as ResponseDto;

      const deleted = await this.userRepository.softDelete(id);

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

  async restore(id: number) {
    try {
      const res = await this.findOne(id, false, true);
      if (!res.data) return res as ResponseDto;

      const restored = await this.userRepository.restore(id);

      if (!restored.affected) {
        return {
          status: HttpStatus.CONFLICT,
          data: null,
        };
      }

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
}
