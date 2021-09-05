import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import crypt from 'bcryptjs';
import { Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { userRepository } from './consts';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(userRepository)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
      });
    }

    try {
      const emailInUse = this.userRepository.findOne({
        email: createUserDto.email,
      });

      if (emailInUse) {
        throw new RpcException({
          status: HttpStatus.CONFLICT,
          errors: [
            {
              message: 'Email already in use',
              field: 'email',
            },
          ],
        });
      }

      createUserDto.password = await crypt.hash(createUserDto.password);
      const user = await this.userRepository.insert(createUserDto);

      return {
        status: HttpStatus.CREATED,
        data: user,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
        errors: [e.error],
      });
    }
  }

  async findAll(params: Partial<CreateUserDto>) {
    if (!params) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
      });
    }

    if (params.password) {
      params.password = await crypt.hash(params.password);
    }

    const rawuUsers = await this.userRepository.find(params);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const users = rawuUsers.map(({ password, ...rest }) => rest);

    return {
      status: HttpStatus.OK,
      data: users,
    };
  }

  async findOne(id: number) {
    if (!id) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        data: null,
      });
    }

    return {
      status: HttpStatus.OK,
      data: user,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (!id || !updateUserDto) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
      });
    }

    try {
      const user = await this.userRepository.findOne(id);

      if (!user) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
        });
      }

      const updatedUser = Object.assign(user, updateUserDto) as User;
      await this.userRepository.save(updatedUser);

      return {
        status: HttpStatus.OK,
        data: updatedUser,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
        errors: [e.error],
      });
    }
  }

  async remove(id: number) {
    if (!id) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
      });
    }

    try {
      const user = await this.userRepository.findOne(id);

      if (!user) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
        });
      }

      await this.userRepository.delete(id);

      return { status: HttpStatus.OK };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
        errors: [e.error],
      });
    }
  }
}
