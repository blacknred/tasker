import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import crypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { USER_REPOSITORY } from './consts';
import { CreateUserDto } from './dto/create-user.dto';
import { GetValidatedUserDto } from './dto/get-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
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
    const users = await this.userRepository.find(getUsersDto);

    return {
      status: HttpStatus.OK,
      data: users,
    };
  }

  async findOne(id: number) {
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

  async findValidatedOne({ email, password }: GetValidatedUserDto) {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        errors: [
          {
            field: 'email',
            message: 'Email not in use',
          },
        ],
      });
    }

    if (await crypt.compare(password, user.password)) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        errors: [
          {
            field: 'password',
            message: 'Wrong password',
          },
        ],
      });
    }

    return {
      status: HttpStatus.OK,
      data: { id: user.id, roles: user.roles },
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne(id);

      if (!user) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          data: null,
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
    try {
      if (!(await this.userRepository.findOne(id))) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          data: null,
        });
      }

      await this.userRepository.delete(id);

      return {
        status: HttpStatus.OK,
        data: null,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
        errors: [e.error],
      });
    }
  }
}
