import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import crypt from 'bcryptjs';
import { Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { userRepository } from './consts';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(userRepository) private userRepository: Repository<User>,
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

      const salt = this.configService.get('SECRET');
      createUserDto.password = await crypt.hash(createUserDto.password, salt);
      const user = await this.userRepository.insert(createUserDto);
      user.raw.password = undefined;

      return {
        status: HttpStatus.CREATED,
        data: user.raw,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
        errors: [e.error],
      });
    }
  }

  async findAll(getUsersDto: GetUsersDto) {
    if (!getUsersDto) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const { password: paramPassword, ...rest } = getUsersDto;
    const rawUsers = await this.userRepository.find(rest);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const users = rawUsers.reduce((all, { password, ...rest }) => {
      if (!paramPassword || crypt.compareSync(paramPassword, password)) {
        return all.concat(rest);
      }
      return all;
    }, []);

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
      if (!(await this.userRepository.findOne(id))) {
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
