import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcryptjs';
import { classToPlain } from 'class-transformer';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CACHE_SERVICE, CACHE_TTL, USER_REPOSITORY } from './consts';
import { CreateTokenDto } from './dto/create-token.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { ResponseDto } from './dto/response.dto';
import { RestoreUserDto } from './dto/restore-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RedisAdapter } from './utils/redis.adapter';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject(CACHE_SERVICE) private readonly cacheService: RedisAdapter,
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
  ) {}

  private fieldMapper<T>(obj: T, isPartial?: boolean): Partial<T> {
    return Object.keys(classToPlain(obj)).reduce((o, k) => {
      if (!isPartial || User.isNotSecured(k)) o[k] = obj[k];
      return o;
    }, {});
  }

  private async parseToken(token: string) {
    const found = await this.cacheService.getAsync(token);

    if (!found) {
      return [
        {
          message: 'Invalid or expired token',
          field: 'token',
        },
      ];
    }

    await this.cacheService.delAsync(token);
    return [null, found];
  }

  async create({ token, ...rest }: CreateUserDto) {
    try {
      // check token
      const [errors, email] = await this.parseToken(token);
      if (errors) {
        return {
          status: HttpStatus.BAD_REQUEST,
          errors,
        };
      }

      const user = this.userRepository.create({ ...rest, email });
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

  async createToken({ email, exist }: CreateTokenDto) {
    try {
      const param = { email };
      const found = await this.userRepository.findOne(param, {
        withDeleted: true,
      });

      let error;
      if (found && !exist) error = 'Email already in use';
      if (!found && exist) error = 'Email not in use';
      if (error) {
        return {
          status: HttpStatus.CONFLICT,
          errors: [
            {
              message: error,
              field: 'email',
            },
          ],
        };
      }

      const token = v4();
      // TODO: check if token with this email allready exists
      await this.cacheService.setAsync(token, email, 'ex', CACHE_TTL);
      // TODO: SEND email with url/token

      return {
        status: HttpStatus.CREATED,
        data: null,
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
      const param = { email };
      const user = await this.userRepository.findOne(param, {
        withDeleted: false,
      });

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

  async restore({ token, password }: RestoreUserDto) {
    try {
      // check token
      const [errors, email] = await this.parseToken(token);
      if (errors) {
        return {
          status: HttpStatus.BAD_REQUEST,
          errors,
        };
      }

      const user = await this.userRepository.findOne({ email });
      Object.assign(user, { deletedAt: null, password });
      await user.hashPassword();

      const data = await this.userRepository.save(user);

      return {
        status: HttpStatus.OK,
        data,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }
}
