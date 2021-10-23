import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetValidatedUserDto } from './dto/get-user.dto';
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

  async findAll({ limit, offset, ...rest }: GetUsersDto) {
    const [users, total] = await this.userRepository.findAndCount({
      where: Object.keys(rest).reduce((acc, key) => {
        if (
          this.userRepository.metadata.hasColumnWithPropertyPath(key) &&
          rest[key]
        ) {
          acc[key] = rest[key];
        }

        return acc;
      }, {}),
      order: { [rest['sort.field'] || 'id']: rest['sort.order'] || 'ASC' },
      skip: offset,
      take: limit + 1,
    });

    return {
      status: HttpStatus.OK,
      data: {
        hasMore: users.length === limit + 1,
        items: users.slice(0, limit),
        total,
      },
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      data: user,
    };
  }

  async findOneValidated({ email, password }: GetValidatedUserDto) {
    try {
      const user = await this.userRepository.findOne({ email });

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

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const res = await this.findOne(id);
      if (!res.data) return res;

      const updatedUser = Object.assign(res.data, updateUserDto) as User;
      await this.userRepository.update(id, updateUserDto);

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

      await this.userRepository.delete(id);

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
