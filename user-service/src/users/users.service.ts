import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
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
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const emailInUse = await this.userRepository.findOne({
        email: createUserDto.email,
      });

      if (emailInUse) {
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
        if (!(User.searchable.includes(key) && rest[key])) return acc;
        acc[key] = rest[key];
        return acc;
      }, {}),
      order: { [rest['sort.field'] || 'id']: rest['sort.order'] || 'ASC' },
      skip: offset,
      take: limit + 1,
      withDeleted: false,
    });

    return {
      status: HttpStatus.OK,
      data: {
        hasMore: items.length === limit + 1,
        items: items.slice(0, limit).map((item) =>
          partial
            ? {
                id: item.id,
                name: item.name,
              }
            : item,
        ),
        total,
      },
    };
  }

  async findOne(id: number, partial?: boolean) {
    const user = await this.userRepository.findOne(id, { withDeleted: false });

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      data: partial ? { id: user.id, name: user.name } : user,
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

      const updatedUser = Object.assign(res.data, rest) as User;
      await this.userRepository.update(id, rest);

      return {
        status: HttpStatus.OK,
        data: updatedUser,
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
      const res = await this.findOne(id);
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
