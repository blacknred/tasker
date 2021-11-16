import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { classToPlain } from 'class-transformer';
import { TokensService } from 'src/tokens/tokens.service';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { USER_REPOSITORY, WORKSPACE_SERVICE } from './consts';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { RestoreUserDto } from './dto/restore-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const message = 'Invalid or expired token';
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly tokensService: TokensService,
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
    @Inject(WORKSPACE_SERVICE) private workspacesService: ClientProxy,
  ) {}

  private fieldMapper<T>(obj: T, isPartial?: boolean): Partial<T> {
    return Object.keys(classToPlain(obj)).reduce((o, k) => {
      if (!isPartial || User.isNotSecured(k)) o[k] = obj[k];
      return o;
    }, {});
  }

  async create({ emailToken, ...rest }: CreateUserDto) {
    try {
      // check token
      const { data } = await this.tokensService.findOne(emailToken);
      if (!data) {
        return {
          status: HttpStatus.BAD_REQUEST,
          errors: [
            { message: 'Invalid or expired token', field: 'emailToken' },
          ],
        };
      }

      const { email, wid, uid } = data;

      // create user
      const user = this.userRepository.create({ ...rest, email });
      await this.userRepository.save(user);

      // add user to workspace
      if (wid) {
        const { name, id, image } = user;
        const payload = { userId: id, name, image, wid, uid };
        await this.workspacesService.send('agents/create', payload).toPromise();
      }

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

  async update({ id, emailToken, password, ...rest }: UpdateUserDto) {
    try {
      const res = await this.findOne(id);
      if (!res.data) return res;

      if (emailToken) {
        const { data } = await this.tokensService.findOne(emailToken);
        if (!data) {
          return {
            status: HttpStatus.BAD_REQUEST,
            errors: [
              { message: 'Invalid or expired token', field: 'emailToken' },
            ],
          };
        }

        res.data.email = data.email;
      }

      if (password) {
        res.data.password = password;
        await res.data.hashPassword();
      }

      Object.assign(res.data, rest);
      const data = await this.userRepository.save(res.data);

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

  async restore({ emailToken, password }: RestoreUserDto) {
    try {
      // check token
      const res = await this.tokensService.findOne(emailToken);
      if (!res.data) {
        return {
          status: HttpStatus.BAD_REQUEST,
          errors: [
            { message: 'Invalid or expired token', field: 'emailToken' },
          ],
        };
      }

      const user = await this.userRepository.findOne({ email: res.data.email });
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
