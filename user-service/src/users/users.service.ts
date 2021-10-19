import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetValidatedUserDto } from './dto/get-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
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
      const user = new User(createUserDto);
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

  async findAll({ limit, offset: skip, ...rest }: GetUsersDto) {
    const take = limit + 1;
    const order = { [rest['sort.field'] || 'id']: rest['sort.order'] || 'ASC' };
    const where = Object.keys(rest).reduce((acc, key) => {
      const exist = this.userRepository.metadata.hasColumnWithPropertyPath(key);
      if (exist && rest[key]) {
        acc[key] = rest[key];
      }

      return acc;
    }, {});

    const [users, total] = await this.userRepository.findAndCount({
      where,
      order,
      skip,
      take,
    });

    return {
      status: HttpStatus.OK,
      data: {
        hasMore: users.length === take,
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
              field: 'email',
              message: 'Email not in use',
            },
          ],
        };
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          errors: [
            {
              field: 'password',
              message: 'Wrong password',
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
      const user = await this.userRepository.findOne(id);

      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: null,
        };
      }

      const updatedUser = Object.assign(user, updateUserDto) as User;
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
      if (!(await this.userRepository.findOne(id))) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: null,
        };
      }

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
